const CACHE = "inspection-app-v1";

// Files to cache for offline use
const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js"
];

// Install: cache all static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for Graph API calls
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Always go to network for SharePoint / Graph API (never cache auth/data)
  if (
    url.hostname.includes("graph.microsoft.com") ||
    url.hostname.includes("login.microsoftonline.com") ||
    url.hostname.includes("sharepoint.com")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first for everything else (app shell + CDN scripts)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache valid GET responses
        if (event.request.method === "GET" && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return the app shell for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
