/*
 * Licensed to the Apache Software Foundation (ASF) under the Apache License, Version 2.0.
 * ASF OSPO website interactions: mobile nav, routing directory tabs,
 * relationship filter, charter TOC scroll-spy, and reveal-on-scroll.
 */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  // Routing directory tabs (WAI-ARIA tabs pattern)
  document.querySelectorAll("[data-router]").forEach(function (router) {
    var tabs = Array.prototype.slice.call(router.querySelectorAll("[data-router-tab]"));
    var panels = router.querySelectorAll("[data-router-panel]");

    function activate(tab, focus) {
      var id = tab.getAttribute("data-router-tab");
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) {
        var on = p.getAttribute("data-router-panel") === id;
        p.classList.toggle("is-active", on);
        p.hidden = !on;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.tabIndex = i === 0 ? 0 : -1;
      tab.addEventListener("click", function () { activate(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var idx = tabs.indexOf(tab);
        var next = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(idx + 1) % tabs.length];
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(idx - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next, true); }
      });
    });
  });

  // Relationship table filter
  document.querySelectorAll("[data-filter]").forEach(function (group) {
    var rows = document.querySelectorAll(".rel-table tbody tr");
    group.querySelectorAll(".filter__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-filter-value");
        group.querySelectorAll(".filter__btn").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });
        rows.forEach(function (row) {
          row.hidden = value !== "all" && row.getAttribute("data-category") !== value;
        });
      });
    });
  });

  // Charter TOC scroll-spy
  var tocLinks = document.querySelectorAll(".doc-toc nav a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[decodeURIComponent(a.hash.slice(1))] = a; });
    var headings = document.querySelectorAll(".prose h2[id], .prose h3[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove("is-current"); });
          map[entry.target.id].classList.add("is-current");
        }
      });
    }, { rootMargin: "-90px 0px -70% 0px" });
    headings.forEach(function (h) { spy.observe(h); });
  }

  // Reveal on scroll
  var revealables = document.querySelectorAll(".card, .principle, .step, .audience, .driver, .callout");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }
})();
