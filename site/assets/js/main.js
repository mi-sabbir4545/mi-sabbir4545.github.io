/*
 * Renders the portfolio from window.PORTFOLIO (data.js).
 * Security note: every piece of content is inserted with textContent / DOM APIs,
 * never innerHTML — so data can't inject markup or scripts.
 */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;

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
  byId("hero-greeting").textContent = D.greeting;
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
  // Lucide icons (ISC licence), stored as element lists so they are built with DOM APIs, not markup strings.
  var ICONS = {"clipboard-check":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"m9 14 2 2 4-4"}]],"bot":[["path",{"d":"M12 8V4H8"}],["rect",{"width":"16","height":"12","x":"4","y":"8","rx":"2"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 14h2"}],["path",{"d":"M15 13v2"}],["path",{"d":"M9 13v2"}]],"gauge":[["path",{"d":"m12 14 4-4"}],["path",{"d":"M3.34 19a10 10 0 1 1 17.32 0"}]],"shield-check":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m9 12 2 2 4-4"}]],"sparkles":[["path",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{"d":"M20 2v4"}],["path",{"d":"M22 4h-4"}],["circle",{"cx":"4","cy":"20","r":"2"}]],"terminal":[["path",{"d":"M12 19h8"}],["path",{"d":"m4 17 6-6-6-6"}]],"git-branch":[["path",{"d":"M15 6a9 9 0 0 0-9 9V3"}],["circle",{"cx":"18","cy":"6","r":"3"}],["circle",{"cx":"6","cy":"18","r":"3"}]],"wrench":[["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]]};
  var SVG_NS = "http://www.w3.org/2000/svg";
  function icon(name) {
    var parts = ICONS[name];
    if (!parts) return null;
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    parts.forEach(function (p) {
      var node = document.createElementNS(SVG_NS, p[0]);
      Object.keys(p[1]).forEach(function (k) { node.setAttribute(k, p[1][k]); });
      svg.appendChild(node);
    });
    return el("span", { class: "skill-icon" }, [svg]);
  }

  fill("skills-grid", D.skills.map(function (g) {
    return el("article", { class: "skill-card" }, [
      icon(g.icon),
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
        el("p", { class: "job-period", text: job.period }),
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
      el("p", { class: "card-kind", text: p.kind }),
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
      el("p", { class: "status", text: s.status }),
      el("h3", { text: s.title }),
      el("p", { class: "card-summary", text: s.detail }),
    ]);
  }));
  fill("roadmap", D.security.roadmap.map(function (r, idx) {
    return el("li", { class: "road-step" }, [
      el("span", { class: "road-num", text: String(idx + 1).padStart(2, "0") }),
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
    if (meta) meta.setAttribute("content", isLight ? "#fafafd" : "#0b0a24");
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
