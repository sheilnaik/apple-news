if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The launcher remains fully usable if service workers are unavailable.
    });
  });
}

// Show today's date above the title, like the Apple News Today feed.
const dateLabel = document.querySelector("[data-today]");
const dateFormat = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" });

function renderDate() {
  if (dateLabel) dateLabel.textContent = dateFormat.format(new Date());
}

renderDate();
// An installed web app can stay open for days, so refresh the date when it returns to the foreground.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") renderDate();
});

// Fade in the compact title bar once the large title scrolls out of view.
const title = document.querySelector(".masthead__title");
if (title && "IntersectionObserver" in window) {
  new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { rootMargin: "-52px 0px 0px 0px" }
  ).observe(title);
}
