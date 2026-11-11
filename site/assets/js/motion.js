/*
 * Smooth scrolling (Lenis) and reveal-on-scroll.
 * Both are skipped when the visitor prefers reduced motion; content is never
 * hidden unless this script is running to reveal it.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- reveal on scroll ----------
  var targets = document.querySelectorAll(
    ".section .container > *, .section .two-col > *, .stats > *, .skills-grid > *, .cards > *, " +
    ".timeline > *, .roadmap > *, .edu-list > *, .post-list > *, .faq > *"
  );
  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("js");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el, i) {
      // containers whose children reveal on their own don't fade as a block
      if (el.matches(".stats, .skills-grid, .cards, .timeline, .roadmap, .edu-list, .post-list, .faq, .two-col")) return;
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  // ---------- smooth scroll ----------
  if (reduceMotion || typeof window.Lenis !== "function") return;
  var lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // In-page links: glide to the section, keep the URL hash and move focus for keyboard users.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    var target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -84 });
    if (history.pushState) history.pushState(null, "", id);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
})();
