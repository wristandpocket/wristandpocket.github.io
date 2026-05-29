importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;

// The jekyll-pwa-workbox plugin will inject the precache manifest here
precacheAndRoute(self.__WB_MANIFEST || []);
