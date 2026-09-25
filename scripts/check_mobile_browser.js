#!/usr/bin/env node
/**
 * Dependency-free 320px browser smoke check.
 *
 * A system Chrome/Chromium/Edge is driven through its DevTools Protocol. The
 * check measures rendered DOM state; it is not a substitute for manual visual
 * QA, device testing, or an accessibility certification.
 */

'use strict';

const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const { URL } = require('node:url');

const ROOT = path.resolve(process.cwd());
const SITE = path.join(ROOT, '_site');
const WIDTH = 320;
const HEIGHT = 568;
const ROUTES = ['/', '/uk/games/', '/games/cyberpunk-3d/', '/blog/', '/404.html'];
const EXPECTED_STATUS = new Map(ROUTES.map(route => [route, route === '/404.html' ? 404 : 200]));
const failures = [];

function findBrowser() {
  const explicit = process.env.BROWSER_PATH || process.env.CHROME_PATH || process.env.EDGE_PATH;
  const candidates = [
    explicit,
    process.platform === 'win32' ? path.join(process.env.ProgramFiles || '', 'Google/Chrome/Application/chrome.exe') : null,
    process.platform === 'win32' ? path.join(process.env['ProgramFiles(x86)'] || '', 'Google/Chrome/Application/chrome.exe') : null,
    process.platform === 'win32' ? path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe') : null,
    process.platform === 'win32' ? path.join(process.env.ProgramFiles || '', 'Microsoft/Edge/Application/msedge.exe') : null,
    process.platform === 'win32' ? path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft/Edge/Application/msedge.exe') : null,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge'
  ].filter(Boolean);
  return candidates.find(candidate => fs.existsSync(candidate)) || null;
}

function contentType(file) {
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webm': 'video/webm',
    '.woff2': 'font/woff2'
  }[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

function createStaticServer() {
  const server = http.createServer((request, response) => {
    let requestPath;
    try {
      requestPath = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    } catch (_) {
      response.writeHead(400);
      response.end('Bad request');
      return;
    }

    const cleanPath = requestPath.replace(/^\/+/, '');
    let file = path.resolve(SITE, cleanPath);
    if (requestPath.endsWith('/')) file = path.join(file, 'index.html');
    if (!file.startsWith(SITE + path.sep) && file !== SITE) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    if (requestPath === '/404.html') {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      fs.createReadStream(path.join(SITE, '404.html')).pipe(response);
      return;
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      file = path.join(SITE, '404.html');
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(file).pipe(response);
      return;
    }
    response.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(response);
  });
  return server;
}

function requestStatus(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, response => {
      response.resume();
      response.once('end', () => resolve(response.statusCode));
    });
    request.once('error', reject);
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });
}

function waitForHttp(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      http.get(url, response => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', chunk => { body += chunk; });
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
          } else if (Date.now() - start < timeoutMs) {
            setTimeout(attempt, 100);
          } else {
            reject(new Error(`DevTools endpoint returned HTTP ${response.statusCode}`));
          }
        });
      }).on('error', () => {
        if (Date.now() - start < timeoutMs) setTimeout(attempt, 100);
        else reject(new Error(`Timed out waiting for ${url}`));
      });
    };
    attempt();
  });
}

class RawWebSocket {
  constructor(url) {
    this.url = url;
    this.listeners = new Map();
    this.buffer = Buffer.alloc(0);
    this.handshake = false;
    this.fragments = [];
    this.socket = net.createConnection({ host: url.hostname, port: Number(url.port) });
    this.socket.on('connect', () => {
      const key = crypto.randomBytes(16).toString('base64');
      this.socket.write(`GET ${url.pathname}${url.search} HTTP/1.1\r\nHost: ${url.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`);
    });
    this.socket.on('data', chunk => this.onData(chunk));
    this.socket.on('error', error => this.emit('error', error));
    this.socket.on('close', () => this.emit('close', {}));
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  emit(type, event) {
    for (const listener of this.listeners.get(type) || []) listener(event);
  }

  onData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    if (!this.handshake) {
      const boundary = this.buffer.indexOf('\r\n\r\n');
      if (boundary < 0) return;
      const headers = this.buffer.subarray(0, boundary).toString('ascii');
      if (!/^HTTP\/1\.1 101 /i.test(headers)) {
        this.emit('error', new Error(`DevTools WebSocket handshake failed: ${headers.split('\r\n')[0]}`));
        return;
      }
      this.handshake = true;
      this.buffer = this.buffer.subarray(boundary + 4);
      this.emit('open', {});
    }
    this.readFrames();
  }

  readFrames() {
    while (this.buffer.length >= 2) {
      const first = this.buffer[0];
      const second = this.buffer[1];
      const opcode = first & 0x0f;
      const masked = (second & 0x80) !== 0;
      let length = second & 0x7f;
      let offset = 2;
      if (length === 126) {
        if (this.buffer.length < 4) return;
        length = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (this.buffer.length < 10) return;
        const high = this.buffer.readUInt32BE(2);
        const low = this.buffer.readUInt32BE(6);
        if (high !== 0) throw new Error('DevTools frame is too large.');
        length = low;
        offset = 10;
      }
      const maskOffset = masked ? 4 : 0;
      if (this.buffer.length < offset + maskOffset + length) return;
      const mask = masked ? this.buffer.subarray(offset, offset + 4) : null;
      offset += maskOffset;
      const payload = Buffer.from(this.buffer.subarray(offset, offset + length));
      this.buffer = this.buffer.subarray(offset + length);
      if (mask) for (let index = 0; index < payload.length; index += 1) payload[index] ^= mask[index % 4];
      if (opcode === 0x8) { this.close(); return; }
      if (opcode === 0x9) { this.writeFrame(payload, 0xA); continue; }
      if (opcode === 0x0) this.fragments.push(payload);
      else if ((first & 0x80) === 0) this.fragments = [payload];
      else this.fragments = [payload];
      if ((first & 0x80) !== 0 || opcode === 0x0) {
        const message = Buffer.concat(this.fragments);
        this.fragments = [];
        this.emit('message', { data: message.toString('utf8') });
      }
    }
  }

  writeFrame(payload, opcode = 0x1) {
    const body = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
    const mask = crypto.randomBytes(4);
    let header;
    if (body.length < 126) header = Buffer.from([0x80 | opcode, 0x80 | body.length]);
    else if (body.length <= 0xffff) {
      header = Buffer.alloc(4);
      header[0] = 0x80 | opcode;
      header[1] = 0x80 | 126;
      header.writeUInt16BE(body.length, 2);
    } else throw new Error('DevTools command is too large.');
    const maskedBody = Buffer.from(body);
    for (let index = 0; index < maskedBody.length; index += 1) maskedBody[index] ^= mask[index % 4];
    this.socket.write(Buffer.concat([header, mask, maskedBody]));
  }

  send(value) { this.writeFrame(value); }

  close() {
    if (!this.socket.destroyed) this.socket.end();
  }
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new RawWebSocket(new URL(url));
    socket.addEventListener('open', () => resolve(socket));
    socket.addEventListener('error', () => reject(new Error('Could not connect to the browser DevTools socket.')));
  });
}

class DevToolsSession {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const pending = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
      } else if (message.method) {
        this.events.push(message);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  waitFor(method, timeoutMs = 10000) {
    const existing = this.events.findIndex(event => event.method === method);
    if (existing >= 0) {
      const [event] = this.events.splice(existing, 1);
      return Promise.resolve(event.params || {});
    }
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs);
      const poll = () => {
        const index = this.events.findIndex(event => event.method === method);
        if (index < 0) return setTimeout(poll, 10);
        clearTimeout(timer);
        const [event] = this.events.splice(index, 1);
        resolve(event.params || {});
      };
      poll();
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) throw new Error('Page evaluation failed.');
    return result.result.value;
  }
}

async function freePort() {
  const probe = net.createServer();
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  return port;
}

function stopProcess(processHandle) {
  if (!processHandle || processHandle.exitCode !== null) return Promise.resolve();
  return new Promise(resolve => {
    let settled = false;
    let exited = false;
    let killCommandFinished = process.platform !== 'win32';
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve();
    };
    const maybeFinish = () => {
      if (exited && killCommandFinished) finish();
    };
    const timer = setTimeout(finish, 5000);
    processHandle.once('exit', () => {
      exited = true;
      maybeFinish();
    });
    processHandle.once('error', () => {
      exited = true;
      maybeFinish();
    });
    if (process.platform === 'win32') {
      cp.execFile('taskkill', ['/pid', String(processHandle.pid), '/t', '/f'], { windowsHide: true }, error => {
        if (error && processHandle.exitCode === null) processHandle.kill();
        killCommandFinished = true;
        maybeFinish();
      });
    } else {
      processHandle.kill('SIGTERM');
      setTimeout(() => {
        if (!settled && processHandle.exitCode === null) processHandle.kill('SIGKILL');
      }, 500);
    }
  });
}

function closeServer(server) {
  if (!server.listening) return Promise.resolve();
  return new Promise(resolve => {
    let settled = false;
    const timer = setTimeout(finish, 2000);
    function finish() {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve();
    }
    server.close(finish);
    if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
  });
}

function isPortFree(port) {
  return new Promise(resolve => {
    const probe = net.createServer();
    probe.once('error', () => resolve(false));
    probe.listen(port, '127.0.0.1', () => probe.close(() => resolve(true)));
  });
}

async function inspectRoute(session, baseUrl, route) {
  const expectedStatus = EXPECTED_STATUS.get(route);
  const httpStatus = await requestStatus(baseUrl + route);
  const navigationDone = session.waitFor('Page.loadEventFired');
  await session.send('Page.navigate', { url: baseUrl + route });
  await navigationDone;
  await session.evaluate(`(async () => {
    for (const image of document.images) image.loading = 'eager';
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.max(window.innerHeight, 1)) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    const imageLoads = [...document.images].map(image => {
      if (image.complete) return Promise.resolve();
      return new Promise(resolve => {
        const finish = () => { image.removeEventListener('load', finish); image.removeEventListener('error', finish); resolve(); };
        image.addEventListener('load', finish, { once: true });
        image.addEventListener('error', finish, { once: true });
        setTimeout(finish, 10000);
      });
    });
    await Promise.all(imageLoads);
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 120));
  })()`);
  const result = await session.evaluate(`(() => {
    const images = [...document.images].map(image => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    }));
    const navTargets = [...document.querySelectorAll('nav a, nav button')].map(element => {
      const rect = element.getBoundingClientRect();
      return {
        label: element.getAttribute('aria-label') || element.textContent.trim().replace(/\\s+/g, ' ').slice(0, 60),
        width: Math.round(rect.width * 100) / 100,
        height: Math.round(rect.height * 100) / 100
      };
    });
    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body ? document.body.scrollWidth : 0),
      h1Count: document.querySelectorAll('h1').length,
      lang: document.documentElement.getAttribute('lang'),
      activeNavigationCount: document.querySelectorAll('nav [aria-current="page"]').length,
      images,
      navTargets,
      tooSmallNavigation: navTargets.filter(target => target.width < 44 || target.height < 44)
    };
  })()`);
  const routeFailures = [];
  if (httpStatus !== expectedStatus) routeFailures.push(`HTTP status is ${httpStatus}, expected ${expectedStatus}`);
  if (result.viewportWidth !== WIDTH) routeFailures.push(`viewport width is ${result.viewportWidth}, expected ${WIDTH}`);
  if (result.scrollWidth > WIDTH) routeFailures.push(`document overflow: scrollWidth ${result.scrollWidth}`);
  if (result.h1Count !== 1) routeFailures.push(`expected one H1, found ${result.h1Count}`);
  if (!result.lang) routeFailures.push('html[lang] is missing');
  if (result.activeNavigationCount < 1) routeFailures.push('no active navigation item with aria-current="page"');
  if (result.images.some(image => !image.complete || image.naturalWidth === 0)) routeFailures.push('one or more images failed to load');
  if (result.tooSmallNavigation.length) routeFailures.push(`navigation target below 44x44: ${JSON.stringify(result.tooSmallNavigation)}`);
  if (routeFailures.length) failures.push(`${route}: ${routeFailures.join('; ')}`);
  return { route, expectedStatus, httpStatus, ...result, pass: routeFailures.length === 0, failures: routeFailures };
}

async function main() {
  if (!fs.existsSync(path.join(SITE, 'index.html'))) throw new Error(`Missing generated site: ${SITE}`);
  const browserPath = findBrowser();
  if (!browserPath) throw new Error('No Chrome, Chromium, or Edge executable found. Set BROWSER_PATH to run this check.');

  const server = createStaticServer();
  let sitePort;
  let debugPort;
  let profile;
  let browser;
  let socket;
  let session;
  try {
    sitePort = await listen(server);
    debugPort = await freePort();
    profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wrist-pocket-browser-'));
    browser = cp.spawn(browserPath, [
      '--headless=new',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${debugPort}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      `http://127.0.0.1:${sitePort}/`
    ], { stdio: 'ignore', windowsHide: true });
    const targets = await waitForHttp(`http://127.0.0.1:${debugPort}/json/list`);
    const target = targets.find(item => item.type === 'page' && item.webSocketDebuggerUrl);
    if (!target) throw new Error('No DevTools page target was created.');
    socket = await connect(target.webSocketDebuggerUrl);
    session = new DevToolsSession(socket);
    await session.send('Page.enable');
    await session.send('Runtime.enable');
    await session.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: true
    });
    const report = [];
    for (const route of ROUTES) report.push(await inspectRoute(session, `http://127.0.0.1:${sitePort}`, route));
    const output = { viewport: `${WIDTH}x${HEIGHT}`, routes: report, visualQa: false };
    const outputPath = path.join(ROOT, 'qa-evidence', 'browser-320.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(JSON.stringify(output, null, 2));
  } finally {
    if (session) {
      try { await session.send('Browser.close'); } catch (_) { /* Browser.close may close the socket before replying. */ }
    }
    if (socket) socket.close();
    await stopProcess(browser);
    await closeServer(server);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) { /* Chrome may release its profile shortly after exit. */ }
    const leakedPorts = [];
    if (sitePort && !(await isPortFree(sitePort))) leakedPorts.push(`site:${sitePort}`);
    if (debugPort && !(await isPortFree(debugPort))) leakedPorts.push(`cdp:${debugPort}`);
    if (leakedPorts.length) throw new Error(`Cleanup left listening port(s): ${leakedPorts.join(', ')}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
