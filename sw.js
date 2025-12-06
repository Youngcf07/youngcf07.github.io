// Self-unregistering service worker to neutralize older broken SWs
// This script attempts to unregister all service workers and clear common caches.
self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil((async () => {
    try {
      // Claim clients so we can control pages immediately
      await self.clients.claim();

      // Try to unregister other service workers
      const registrations = await self.registration.scope ? [self.registration] : await self.getRegistrations?.() || [];
      for (const reg of registrations) {
        try { await reg.unregister(); } catch(e){}
      }

      // Attempt to delete all caches
      if (self.caches && self.caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) {
      // swallow errors
    }
  })());
});

// Immediately respond with network fetch for all requests
self.addEventListener('fetch', function(event){
  event.respondWith(fetch(event.request).catch(() => new Response('', {status: 204}))); 
});
