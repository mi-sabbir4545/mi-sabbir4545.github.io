// Theme toggle for the plain pages (blog), which don't load data.js / main.js.
(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  function sync() {
    var isLight = root.getAttribute("data-theme") === "light";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f4efe6" : "#161412");
  }
  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    sync();
  });
  sync();
})();
