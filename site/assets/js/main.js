/*
 * Renders the portfolio from window.PORTFOLIO (data.js).
 * Security note: every piece of content is inserted with textContent / DOM APIs,
 * never innerHTML — so data can't inject markup or scripts.
 */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- tiny DOM helper ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function byId(id) { return document.getElementById(id); }
  function fill(id, nodes) {
    var target = byId(id);
    if (!target) return;
    target.textContent = "";
    nodes.forEach(function (n) { target.appendChild(n); });
  }
  function capitalize(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function chip(text) { return el("li", { class: "chip", text: text }); }
  function externalLink(url, label, cls) {
    return el("a", { href: url, target: "_blank", rel: "noopener noreferrer", class: cls || "", text: label });
  }

  // ---------- hero ----------
  byId("hero-name").textContent = D.name;
  byId("hero-role").textContent = D.role;
  byId("hero-tagline").textContent = D.tagline;
  byId("hero-location").textContent = D.location;
  byId("cv-link").setAttribute("href", D.cv);

  fill("stats", D.stats.map(function (s) {
    return el("div", { class: "stat" }, [
      el("dt", { class: "stat-label", text: s.label }),
      el("dd", { class: "stat-value", text: s.value }),
    ]);
  }));

  // $ whoami typing effect (instant when reduced motion is preferred)
  var typed = byId("typed");
  var out = byId("whoami-out");
  var cmd = "whoami";
  out.textContent = D.handle + " — " + D.whoami; // text is in place early (no layout shift), revealed after typing
  if (reduceMotion) {
    typed.textContent = cmd;
    out.classList.add("show");
  } else {
    typed.textContent = "";
    var i = 0;
    var timer = setInterval(function () {
      typed.textContent = cmd.slice(0, ++i);
      if (i >= cmd.length) {
        clearInterval(timer);
        setTimeout(function () { out.classList.add("show"); }, 250);
      }
    }, 110);
  }

  // ---------- about ----------
  fill("about-text", D.about.map(function (p) { return el("p", { text: p }); }));
  fill("highlights", D.highlights.map(function (h) {
    var parts = h.split(" — ");
    return el("li", { class: "highlight" }, [
      el("strong", { text: parts[0] }),
      el("span", { text: capitalize(parts.slice(1).join(" — ")) }),
    ]);
  }));

  // ---------- skills ----------
  fill("skills-grid", D.skills.map(function (g) {
    return el("article", { class: "skill-card" }, [
      el("h3", { text: g.group }),
      el("ul", { class: "chips" }, g.items.map(chip)),
    ]);
  }));
  fill("domains", D.domains.map(chip));

  // ---------- experience ----------
  fill("timeline", D.experience.map(function (job) {
    return el("li", { class: "job" }, [
      el("div", { class: "job-head" }, [
        el("div", null, [
          el("h3", { class: "job-role", text: job.role }),
          el("p", { class: "job-company", text: job.company }),
        ]),
        el("p", { class: "job-period mono", text: job.period }),
      ]),
      el("ul", { class: "job-points" }, job.points.map(function (p) { return el("li", { text: p }); })),
      el("ul", { class: "chips chips-sm", "aria-label": "Tools used" }, job.tags.map(chip)),
    ]);
  }));

  // ---------- projects ----------
  fill("project-cards", D.projects.map(function (p) {
    var footer = p.link
      ? el("p", { class: "card-link" }, [externalLink(p.link.url, p.link.label + " →")])
      : null;
    return el("article", { class: "card" }, [
      el("p", { class: "card-kind mono", text: p.kind }),
      el("h3", { text: p.title }),
      el("p", { class: "card-summary", text: p.summary }),
      el("ul", { class: "card-points" }, p.points.map(function (t) { return el("li", { text: t }); })),
      el("ul", { class: "chips chips-sm", "aria-label": "Tech stack" }, p.stack.map(chip)),
      footer,
    ]);
  }));

  // ---------- security ----------
  byId("security-intro").textContent = D.security.intro;
  fill("security-now", D.security.now.map(function (s) {
    return el("article", { class: "card card-compact" }, [
      el("p", { class: "status mono", text: s.status }),
      el("h3", { text: s.title }),
      el("p", { class: "card-summary", text: s.detail }),
    ]);
  }));
  fill("roadmap", D.security.roadmap.map(function (r, idx) {
    return el("li", { class: "road-step" }, [
      el("span", { class: "road-num mono", text: String(idx + 1).padStart(2, "0") }),
      el("div", null, [el("h4", { text: r.step }), el("p", { text: r.note })]),
    ]);
  }));

  // ---------- education ----------
  var edu = [el("li", { class: "edu" }, [
    el("h3", { text: D.education.degree }),
    el("p", { text: D.education.school + " · " + D.education.year }),
  ])];
  D.training.forEach(function (t) {
    edu.push(el("li", { class: "edu" }, [el("h3", { text: t.title }), el("p", { text: t.detail })]));
  });
  fill("edu-list", edu);

  // ---------- contact ----------
  byId("availability").textContent = D.availability;
  byId("email-link").setAttribute("href", "mailto:" + D.links.email);
  byId("email-text").textContent = D.links.email;
  byId("linkedin-link").setAttribute("href", D.links.linkedin);
  byId("github-link").setAttribute("href", D.links.github);
  byId("year").textContent = String(new Date().getFullYear());

  // ---------- theme toggle ----------
  var root = document.documentElement;
  var toggle = byId("theme-toggle");
  function syncToggle() {
    var isLight = root.getAttribute("data-theme") === "light";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f7f9fb" : "#0b0f14");
  }
  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    syncToggle();
  });
  syncToggle();

  // ---------- mobile menu ----------
  var menuBtn = byId("menu-toggle");
  var nav = byId("site-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
  });

  // ---------- highlight current section in nav ----------
  if ("IntersectionObserver" in window) {
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          map[e.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = byId(id); if (s) io.observe(s); });
  }
})();
