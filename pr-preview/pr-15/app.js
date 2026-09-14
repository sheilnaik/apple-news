if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The launcher remains fully usable if service workers are unavailable.
    });
  });
}
