// Network-only navigation: never cache forms, submissions, auth or private records.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if(event.request.mode !== 'navigate' || event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>AJH Digital — Offline</title><body style="margin:0;padding:48px 24px;background:#0F2A44;color:white;font:18px system-ui"><h1>AJH Digital</h1><p>You are offline. Reconnect to continue exploring or submit your project.</p><button onclick="location.reload()" style="padding:14px 24px;font:inherit">Try again</button></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}})));
});
