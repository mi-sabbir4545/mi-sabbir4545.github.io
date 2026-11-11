// Runs before first paint so the page never flashes the wrong theme.
(function () {
  var root = document.documentElement;
  var theme = "light"; // light-first design
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) { /* storage blocked: keep default */ }
  root.setAttribute("data-theme", theme);
  // Lets CSS hide reveal-on-scroll content only when JS is there to show it again.
  root.classList.add("js");
})();
