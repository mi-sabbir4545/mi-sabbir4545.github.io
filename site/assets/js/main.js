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

  // ---------- key phrases ----------
  // Splits text into plain text nodes and <strong class="kw"> for the phrases in D.keywords
  // (longest first, whole words only). Built with DOM nodes, never markup strings.
  var kwPattern = null;
  if (D.keywords && D.keywords.length) {
    var escaped = D.keywords.slice().sort(function (a, b) { return b.length - a.length; })
      .map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    kwPattern = new RegExp("(^|[^\\w])(" + escaped.join("|") + ")(?![\\w])", "g");
  }
  function marked(text) {
    var frag = document.createDocumentFragment();
    if (!kwPattern) { frag.appendChild(document.createTextNode(text)); return frag; }
    var last = 0, m;
    kwPattern.lastIndex = 0;
    while ((m = kwPattern.exec(text))) {
      var start = m.index + m[1].length;
      if (start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));
      frag.appendChild(el("strong", { class: "kw", text: m[2] }));
      last = start + m[2].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }
  function setMarked(node, text) { node.textContent = ""; node.appendChild(marked(text)); }
  function markedEl(tag, cls, text) {
    var n = el(tag, cls ? { class: cls } : null);
    n.appendChild(marked(text));
    return n;
  }

  // ---------- hero ----------
  byId("hero-greeting").textContent = D.greeting;
  byId("hero-name").textContent = D.name;
  byId("hero-role").textContent = D.role;
  byId("hero-tagline").textContent = D.tagline;
  setMarked(byId("hero-summary"), D.summary);
  byId("hero-location").textContent = D.location;
  byId("cv-link").setAttribute("href", D.cv);

  // ---------- about ----------
  fill("about-text", D.about.map(function (p) { return markedEl("p", null, p); }));
  fill("highlights", D.highlights.map(function (h) {
    var parts = h.split(" — ");
    return el("li", { class: "highlight" }, [
      el("strong", { text: parts[0] }),
      markedEl("span", null, capitalize(parts.slice(1).join(" — "))),
    ]);
  }));

  // ---------- skills ----------
  // Lucide icons (ISC licence), stored as element lists so they are built with DOM APIs, not markup strings.
  var ICONS = {"clipboard-check":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"m9 14 2 2 4-4"}]],"bot":[["path",{"d":"M12 8V4H8"}],["rect",{"width":"16","height":"12","x":"4","y":"8","rx":"2"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 14h2"}],["path",{"d":"M15 13v2"}],["path",{"d":"M9 13v2"}]],"gauge":[["path",{"d":"m12 14 4-4"}],["path",{"d":"M3.34 19a10 10 0 1 1 17.32 0"}]],"shield-check":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m9 12 2 2 4-4"}]],"sparkles":[["path",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{"d":"M20 2v4"}],["path",{"d":"M22 4h-4"}],["circle",{"cx":"4","cy":"20","r":"2"}]],"terminal":[["path",{"d":"M12 19h8"}],["path",{"d":"m4 17 6-6-6-6"}]],"git-branch":[["path",{"d":"M15 6a9 9 0 0 0-9 9V3"}],["circle",{"cx":"18","cy":"6","r":"3"}],["circle",{"cx":"6","cy":"18","r":"3"}]],"wrench":[["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]]};
  // Icons for the domain list, the stat cards and the career journey card (Lucide).
  var DOMAIN_ICONS = {"users":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{"d":"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{"cx":"9","cy":"7","r":"4"}]],"wallet":[["path",{"d":"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{"d":"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}]],"heart-pulse":[["path",{"d":"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}],["path",{"d":"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]],"graduation-cap":[["path",{"d":"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{"d":"M22 10v6"}],["path",{"d":"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]],"bus":[["path",{"d":"M8 6v6"}],["path",{"d":"M15 6v6"}],["path",{"d":"M2 12h19.6"}],["path",{"d":"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"}],["circle",{"cx":"7","cy":"18","r":"2"}],["path",{"d":"M9 18h5"}],["circle",{"cx":"16","cy":"18","r":"2"}]],"warehouse":[["path",{"d":"M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"}],["path",{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"}],["path",{"d":"M6 13h12"}],["path",{"d":"M6 17h12"}]],"truck":[["path",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{"d":"M15 18H9"}],["path",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{"cx":"17","cy":"18","r":"2"}],["circle",{"cx":"7","cy":"18","r":"2"}]],"shopping-cart":[["path",{"d":"m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"}],["path",{"d":"M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"}],["circle",{"cx":"18","cy":"20","r":"2"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"boxes":[["path",{"d":"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{"d":"m7 16.5-4.74-2.85"}],["path",{"d":"m7 16.5 5-3"}],["path",{"d":"M7 16.5v5.17"}],["path",{"d":"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{"d":"m17 16.5-5-3"}],["path",{"d":"m17 16.5 4.74-2.85"}],["path",{"d":"M17 16.5v5.17"}],["path",{"d":"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{"d":"M12 8 7.26 5.15"}],["path",{"d":"m12 8 4.74-2.85"}],["path",{"d":"M12 13.5V8"}]],"mail":[["path",{"d":"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}]],"megaphone":[["path",{"d":"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"}],["path",{"d":"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"}],["path",{"d":"M8 6v8"}]],"smartphone":[["rect",{"width":"14","height":"20","x":"5","y":"2","rx":"2","ry":"2"}],["path",{"d":"M12 18h.01"}]]};
  var EXTRA_ICONS = {"calendar-check":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"m9 15 2 2 4-4"}]],"app-window":[["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}],["path",{"d":"M10 4v4"}],["path",{"d":"M2 8h20"}],["path",{"d":"M6 4v4"}]],"building-2":[["path",{"d":"M10 12h4"}],["path",{"d":"M10 8h4"}],["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"}],["path",{"d":"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"}]],"layers":[["path",{"d":"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{"d":"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{"d":"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]],"briefcase-business":[["path",{"d":"M12 12h.01"}],["path",{"d":"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{"d":"M22 13a18.15 18.15 0 0 1-20 0"}],["rect",{"width":"20","height":"14","x":"2","y":"6","rx":"2"}]]};
  [DOMAIN_ICONS, EXTRA_ICONS].forEach(function (set) { Object.keys(set).forEach(function (k) { ICONS[k] = set[k]; }); });
  var SVG_NS = "http://www.w3.org/2000/svg";
  function icon(name, cls) {
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
    return el("span", { class: cls || "skill-icon" }, [svg]);
  }

  fill("skills-grid", D.skills.map(function (g) {
    return el("article", { class: "skill-card" }, [
      icon(g.icon),
      el("h3", { text: g.group }),
      el("ul", { class: "chips" }, g.items.map(chip)),
    ]);
  }));
  fill("domains", D.domains.map(chip));

  // ---------- hero extras (need icon()) ----------
  // Stat cards with an icon each; the icon sits inside <dt> so the <dl> keeps a valid dt/dd structure.
  fill("stats", D.stats.map(function (s) {
    return el("div", { class: "stat" }, [
      el("dt", { class: "stat-label" }, [icon(s.icon, "stat-icon"), document.createTextNode(s.label)]),
      el("dd", { class: "stat-value", text: s.value }),
    ]);
  }));

  // Career journey: oldest to newest, the current company marked "Now".
  // "Apr 2022 – Dec 2022" → "2022", "Jan 2021 – Mar 2022" → "2021 – 2022", "Jan 2023 – Present" → "2023 – Present"
  function shortPeriod(p) {
    var parts = p.replace(/[A-Za-z]{3} (\d{4})/g, "$1").split(/\s*–\s*/);
    return parts.length === 2 && parts[0] === parts[1] ? parts[0] : parts.join(" – ");
  }
  fill("journey-steps", D.experience.slice().reverse().map(function (job) {
    var current = /present/i.test(job.period);
    return el("li", { class: "journey-step" + (current ? " is-current" : "") }, [
      el("span", { class: "journey-dot", "aria-hidden": "true" }),
      el("p", { class: "journey-period", text: shortPeriod(job.period) }),
      el("h3", { class: "journey-company", text: job.company }),
      el("p", { class: "journey-role", text: job.role }),
      current ? el("span", { class: "journey-now", text: "Now" }) : null,
    ]);
  }));
  var jIcon = icon("briefcase-business", "journey-icon");
  var jHead = byId("journey-title");
  if (jIcon && jHead) jHead.parentNode.insertBefore(jIcon, jHead);

  // Domain knowledge: a slowly scrolling list next to the dashboard. The second list only
  // makes the loop seamless, so it is hidden from screen readers.
  function railItem(d) {
    return el("li", { class: "rail-item" }, [icon((D.domainIcons || {})[d], "rail-icon"), el("span", { text: d })]);
  }
  fill("rail-track", D.domains.map(railItem));
  fill("rail-track-2", D.domains.map(railItem));

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
      el("ul", { class: "job-points" }, job.points.map(function (p) { return markedEl("li", null, p); })),
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
  setMarked(byId("security-intro"), D.security.intro);
  fill("security-now", D.security.now.map(function (s) {
    return el("article", { class: "card card-compact" }, [
      el("p", { class: "status", text: s.status }),
      el("h3", { text: s.title }),
      markedEl("p", "card-summary", s.detail),
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
