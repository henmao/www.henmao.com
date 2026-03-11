if (typeof window !== "undefined" && typeof window.gtag !== "function") {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
}
