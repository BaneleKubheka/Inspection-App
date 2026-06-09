const CACHE = "inspection-app-v10";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // Never intercept Microsoft auth, Microsoft Graph, or external library CDNs.
  if (
    url.hostname.includes("graph.microsoft.com") ||
    url.hostname.includes("login.microsoftonline.com") ||
    url.hostname.includes("alcdn.msauth.net") ||
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("cdn.jsdelivr.net")
  ) {
    event.respondWith(fetch(req));
    return;
  }

  // Network-first for HTML/app files so deployments do not keep using old cached code.
  if (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("index.html")) {
    event.respondWith(
      fetch(req, { cache: "no-store" }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Network-first for same-origin static files; fallback to cache only if offline.
  if (url.origin === self.location.origin && req.method === "GET") {
    event.respondWith(
      fetch(req, { cache: "no-store" }).then(response => {
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(req, clone));
        return response;
      }).catch(() => caches.match(req))
    );
  }
});
