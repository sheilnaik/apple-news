if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The launcher remains fully usable if service workers are unavailable.
    });
  });
}

const dateLabel = document.querySelector("[data-today]");
const editionLabel = document.querySelector("[data-edition]");
const dateFormat = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" });

// Name the "edition" after the time of day, like a newspaper printing through the day.
function editionFor(hour) {
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 22) return "Evening";
  return "Late";
}

function renderMasthead() {
  const now = new Date();
  if (dateLabel) dateLabel.textContent = dateFormat.format(now);
  if (editionLabel) {
    const em = document.createElement("em");
    em.textContent = editionFor(now.getHours());
    editionLabel.replaceChildren(em, " Edition");
  }
}

renderMasthead();
// An installed web app can stay open for hours, so refresh when it returns to the foreground.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") renderMasthead();
});

// Section counts and entrance-animation order are derived from the markup, so adding a source needs no JS changes.
document.querySelector(".masthead")?.style.setProperty("--i", 0);
let tileIndex = 0;
document.querySelectorAll(".widget").forEach((widget, i) => {
  widget.style.setProperty("--i", i + 1);
  const tiles = widget.querySelectorAll(".tile");
  const count = widget.querySelector("[data-count]");
  if (count) count.textContent = tiles.length;
  tiles.forEach((tile) => tile.style.setProperty("--t", tileIndex++));
});
