#!/usr/bin/env node
/**
 * fix-frontmatter.js
 * Front Matter CMS Custom Action
 *
 * Normalizes the front matter of a file based on its Content Type definition
 * in frontmatter.json. Removes undocumented fields and adds missing ones.
 * Relies on a robust custom YAML regex extractor instead of the CMS JSON payload.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('No arguments provided by Front Matter CMS.');
  process.exit(1);
}

let filePath = null;

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
    try {
      const parsed = JSON.parse(arg);
      if (parsed.path || parsed.filePath) {
        filePath = parsed.path || parsed.filePath;
      }
    } catch (e) {
      console.error("JSON parse error:", e.message);
    }
  }
}

if (!filePath) {
  for (let j = 0; j < rawArgs.length; j++) {
    const possiblePath = rawArgs[j];
    if (possiblePath.toLowerCase().endsWith('.md') && fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }
}

if (!filePath || !fs.existsSync(filePath)) {
  console.error('Could not resolve a valid file path from arguments.');
  process.exit(1);
}

filePath = path.resolve(filePath);

const projectRoot = path.resolve(__dirname, '../../');
const fmJsonPath = path.join(projectRoot, 'frontmatter.json');

if (!fs.existsSync(fmJsonPath)) {
  console.error('frontmatter.json not found at ' + fmJsonPath);
  process.exit(1);
}

const fmJson = JSON.parse(fs.readFileSync(fmJsonPath, 'utf-8'));
const contentTypes = fmJson['frontMatter.taxonomy.contentTypes'] || [];

const content = fs.readFileSync(filePath, 'utf-8');
const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

if (!fmMatch) {
  console.error('No front matter found in the file.');
  process.exit(1);
}

const fmBlock = fmMatch[1];

// Extract layout/type to pick schema
let cTypeStr = 'post';

// Reliable method 1: Check the folder path
if (filePath.includes('/_education/') || filePath.includes('\\_education\\')) {
    cTypeStr = 'education';
} else {
    // Fallback: Check fmContentType or layout in the file
    const fmContentTypeMatch = fmBlock.match(/^fmContentType:\s*(.*)$/m);
    const layoutMatch = fmBlock.match(/^layout:\s*(.*)$/m);
    
    if (fmContentTypeMatch) {
        cTypeStr = fmContentTypeMatch[1].replace(/^["']|["']$/g, '').trim();
    } else if (layoutMatch) {
        cTypeStr = layoutMatch[1].replace(/^["']|["']$/g, '').trim();
    }
}

let schema = contentTypes.find(c => c.name.toLowerCase() === cTypeStr.toLowerCase());
if (!schema) {
  schema = contentTypes.find(c => c.name.toLowerCase() === 'post');
}
if (!schema) {
  console.error('No matching content type schema found for: ' + cTypeStr);
  process.exit(1);
}

// Extract using Regex for each schema field
function extractValues(fields, yamlBlock, indentLevel = 0) {
  const data = {};
  for (const field of fields) {
    const key = field.name;
    const isRoot = indentLevel === 0;
    
    if (field.type === 'block') {
      const blockRegex = isRoot ? new RegExp(`^${key}:\\s*\\r?\\n((?:[ \\t]+.*\\r?\\n?)*)`, 'm') 
                                : new RegExp(`^[ \\t]{${indentLevel}}${key}:\\s*\\r?\\n((?:[ \\t]{${indentLevel + 2},}.*\\r?\\n?)*)`, 'm');
      const match = yamlBlock.match(blockRegex);
      if (match) {
        data[key] = extractValues(field.fields || [], match[1], indentLevel + 2);
      } else {
        data[key] = {};
      }
    } else if (field.type === 'tags' || field.type === 'categories' || field.type === 'list') {
      const listRegex = isRoot ? new RegExp(`^${key}:\\s*\\r?\\n((?:[ \\t]+-[ \\t]+.*\\r?\\n?)*)`, 'm')
                               : new RegExp(`^[ \\t]{${indentLevel}}${key}:\\s*\\r?\\n((?:[ \\t]{${indentLevel + 2},}-[ \\t]+.*\\r?\\n?)*)`, 'm');
      const match = yamlBlock.match(listRegex);
      if (match) {
        const itemRegex = /^[ \t]+-[ \t]+(.*)$/gm;
        const items = [];
        let m;
        while ((m = itemRegex.exec(match[1])) !== null) {
          let val = m[1].trim();
          val = val.replace(/^["']|["']$/g, '').trim();
          if (val === 'null') val = null;
          if (val !== null) items.push(val);
        }
        data[key] = items;
      } else {
        data[key] = null;
      }
    } else {
      const valRegex = isRoot ? new RegExp(`^${key}:\\s*(.*)$`, 'm')
                              : new RegExp(`^[ \\t]{${indentLevel}}${key}:\\s*(.*)$`, 'm');
      const match = yamlBlock.match(valRegex);
      if (match) {
        let val = match[1].trim();
        const quoteMatch = val.match(/^(["'])(.*?)\1\s*(?:#.*)?$/);
        if (quoteMatch) {
          val = quoteMatch[2];
        } else {
          const commentIdx = val.indexOf(' #');
          if (commentIdx !== -1) {
            val = val.substring(0, commentIdx).trim();
          }
          val = val.replace(/^["']|["']$/g, '').trim();
        }
        if (val === 'null') val = null;
        else if (val === 'true') val = true;
        else if (val === 'false') val = false;
        data[key] = val;
      } else {
        data[key] = null;
      }
    }
  }
  return data;
}

const fmData = extractValues(schema.fields, fmBlock, 0);

function toYamlValue(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean' || typeof val === 'number') return String(val);
  
  if (typeof val === 'string') {
    return JSON.stringify(val);
  }
  
  if (val instanceof Date) {
    return `"${val.toISOString()}"`;
  }

  return JSON.stringify(val);
}

const newYamlLines = [];

function processSchemaFields(fields, data, indent = '') {
  for (const field of fields) {
    const key = field.name;
    const value = data[key];

    if (field.type === 'block') {
      newYamlLines.push(`${indent}${key}:`);
      processSchemaFields(field.fields || [], value || {}, indent + '  ');
    } else {
      let finalValue = value;

      if (finalValue === undefined || finalValue === null || finalValue === '') {
        if (field.default !== undefined) {
          finalValue = field.default;
        } else {
          finalValue = null;
        }
      }

      if (typeof finalValue === 'string' && finalValue.includes('{{now}}')) {
        finalValue = new Date().toISOString(); 
        if (key === 'date' && data.date) {
            finalValue = data.date;
        }
      }

      if (field.type === 'tags' || field.type === 'categories' || field.type === 'list') {
        if (Array.isArray(finalValue) && finalValue.length > 0) {
          newYamlLines.push(`${indent}${key}:`);
          for (const item of finalValue) {
            newYamlLines.push(`${indent}  - ${toYamlValue(item)}`);
          }
        } else {
           newYamlLines.push(`${indent}${key}: null`);
        }
      } else {
        if (key === 'fmContentType') {
           finalValue = schema.name;
        }
        newYamlLines.push(`${indent}${key}: ${toYamlValue(finalValue)}`);
      }
    }
  }
}

// Rescue logic: extract rogue 'last_modified_at' directly if it exists but wasn't caught
const rogueModifiedRegex = /^last_modified_at:\s*(.*)$/gm;
let lastModifiedMatch;
let lastModifiedValue = fmData.last_modified_at;
while ((lastModifiedMatch = rogueModifiedRegex.exec(fmBlock)) !== null) {
    let val = lastModifiedMatch[1].trim().replace(/^["']|["']$/g, '');
    if (val && val !== 'null') lastModifiedValue = val;
}
if (!fmData.last_modified_at && lastModifiedValue) {
    fmData.last_modified_at = lastModifiedValue;
}

processSchemaFields(schema.fields, fmData, '');

const newFmString = '---\n' + newYamlLines.join('\n') + '\n---';
const body = content.slice(fmMatch[0].length);
const finalFileContent = newFmString + body;

// Count stats
const existingKeys = new Set();
fmBlock.split(/\r?\n/).forEach(line => {
  const m = line.match(/^([a-z_]+):/);
  if (m) existingKeys.add(m[1]);
});

const schemaKeys = new Set();
function collectKeys(fields) {
  for (const f of fields) {
    schemaKeys.add(f.name);
    if (f.fields) collectKeys(f.fields);
  }
}
collectKeys(schema.fields);

const kept = [...existingKeys].filter(k => schemaKeys.has(k)).length;
const removed = [...existingKeys].filter(k => !schemaKeys.has(k));
const added = [...schemaKeys].filter(k => !existingKeys.has(k));

try {
  fs.writeFileSync(filePath, finalFileContent, 'utf-8');
  let summary = `✅ Normalized to '${schema.name}' schema!\n`;
  summary += `   📋 ${schemaKeys.size} fields in schema\n`;
  summary += `   ✓ ${kept} fields preserved\n`;
  if (added.length > 0) {
    summary += `   + ${added.length} defaults added: ${added.join(', ')}\n`;
  }
  if (removed.length > 0) {
    summary += `   ✗ ${removed.length} unknown fields removed: ${removed.join(', ')}\n`;
  }
  console.log(summary);
} catch (e) {
  console.error('Failed to write file: ' + e.message);
  process.exit(1);
}

