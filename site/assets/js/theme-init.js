// Runs before first paint so the page never flashes the wrong theme.
(function () {
  var theme = "dark"; // dark-first design
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) { /* storage blocked: keep default */ }
  document.documentElement.setAttribute("data-theme", theme);
})();
