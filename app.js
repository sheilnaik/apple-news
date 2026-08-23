const editionDate = document.querySelector("#edition-date");

if (editionDate) {
  const today = new Date();
  editionDate.dateTime = today.toISOString().slice(0, 10);
  editionDate.textContent = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(today);
}
