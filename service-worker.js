
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("tic-tac-toe-v1").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "confetti.js",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
