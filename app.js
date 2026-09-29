if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The launcher remains fully usable if service workers are unavailable.
    });
  });
}

const volumeLabel = document.querySelector("[data-volume]");
const dateline = document.querySelector("[data-dateline]");
const dateFormat = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });

function toRoman(value) {
  const numerals = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let result = "";
  for (const [amount, numeral] of numerals) {
    while (value >= amount) {
      result += numeral;
      value -= amount;
    }
  }
  return result;
}

// Newspaper-style dateline: volume is the year of the century, number is the day of the year.
function renderDateline() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / 86400000);
  if (volumeLabel) volumeLabel.textContent = `Vol. ${toRoman(now.getFullYear() % 100)} · No. ${dayOfYear}`;
  if (dateline) dateline.textContent = dateFormat.format(now);
}

renderDateline();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") renderDateline();
});

// Title counts and the entrance order come from the markup, so adding a publication needs no script changes.
let pubIndex = 0;
document.querySelectorAll(".desk").forEach((desk, i) => {
  desk.style.setProperty("--i", i);
  const pubs = desk.querySelectorAll(".pub");
  const count = desk.querySelector("[data-count]");
  if (count) count.textContent = String(pubs.length).padStart(2, "0");
  pubs.forEach((pub) => pub.style.setProperty("--t", pubIndex++));
});
