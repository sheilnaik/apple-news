const CACHE_NAME = "apple-news-shell-v18";
// Google Fonts live in their own cache so they survive shell updates.
const FONT_CACHE = "apple-news-fonts-v1";
const FONT_ORIGINS = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=15",
  "./app.js?v=4",
  "./manifest.webmanifest",
  "./logos/404-media.png",
  "./logos/ars-technica.svg",
  "./logos/bloomberg-businessweek.png",
  "./logos/bloomberg.png",
  "./logos/central-jersey-news.png",
  "./logos/christian-science-monitor.png",
  "./logos/economist.png",
  "./logos/fast-company.png",
  "./logos/daring-fireball.png",
  "./logos/mit-technology-review.png",
  "./logos/new-scientist.png",
  "./logos/reuters.png",
  "./logos/semafor.png",
  "./logos/sportico.png",
  "./logos/techcrunch.png",
  "./logos/the-athletic.png",
  "./logos/the-verge.png",
  "./logos/wall-street-journal.png",
  "./logos/wired.png",
  "./icons/app-icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME && key !== FONT_CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (FONT_ORIGINS.includes(url.origin)) {
    // Cache-first: font files are immutable, and the stylesheet only changes when the URL does.
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(event.request).then(
          (cached) =>
            cached ||
            fetch(event.request).then((response) => {
              if (response.ok || response.type === "opaque") cache.put(event.request, response.clone());
              return response;
            })
        )
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
    )
  );
});
