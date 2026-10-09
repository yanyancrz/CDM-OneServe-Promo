/* ==========================================================================
   CDM OneServe — Site Behaviour
   Lightweight vanilla JS: config injection, nav, reveal animations,
   installation tabs, FAQ accordion, back-to-top.
   ========================================================================== */

(function () {
  "use strict";

  var cfg = window.ONESERVE_CONFIG || {};
  var app = cfg.app || {};
  var APP_URL = app.url || "#";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. Apply centralized configuration to the DOM
     ------------------------------------------------------------------ */

  // "Open OneServe" buttons -> live application URL
  document.querySelectorAll("[data-open-app]").forEach(function (el) {
    el.setAttribute("href", APP_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // Per-service links
  var services = cfg.services || [];
  document.querySelectorAll("[data-service]").forEach(function (el) {
    var id = el.getAttribute("data-service");
    var svc = services.filter(function (s) { return s.id === id; })[0];
    var url = (svc && svc.url) || APP_URL;
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
    // Optional status label for services not yet fully connected
    if (svc && svc.status && svc.status !== "available") {
      var badge = document.createElement("span");
      badge.className = "service-status status-" + svc.status;
      badge.textContent = svc.status === "beta" ? "Beta" : "Coming Soon";
      el.appendChild(document.createTextNode(" "));
      el.parentNode.insertBefore(badge, el.nextSibling);
    }
  });

  // Text values from config
  var contact = cfg.contact || {};
  var copyrightLine = document.querySelector('[data-config-text="copyrightLine"]');
  if (copyrightLine) {
    var start = (cfg.misc && cfg.misc.copyrightStartYear) || new Date().getFullYear();
    var now = new Date().getFullYear();
    copyrightLine.textContent = start === now ? String(now) : start + "–" + now;
  }
  var footerContact = document.querySelector('[data-config-text="contact.line"]');
  if (footerContact) {
    var line = contact.email || contact.phone || contact.office;
    footerContact.textContent = line ? line : "";
    if (!line) footerContact.style.display = "none";
  }
  var instName = document.querySelectorAll('[data-config-text="institution.name"]');
  if (cfg.institution && cfg.institution.name) {
    instName.forEach(function (el) { el.textContent = cfg.institution.name; });
  }

  // Open Graph url (current page)
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", window.location.href);

  /* ------------------------------------------------------------------
     2. Sticky header + back-to-top visibility
     ------------------------------------------------------------------ */
  var header = document.getElementById("header");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
  }
  var scrollTick = false;
  window.addEventListener("scroll", function () {
    if (scrollTick) return;
    scrollTick = true;
    window.requestAnimationFrame(function () { onScroll(); scrollTick = false; });
  }, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     3. Mobile menu
     ------------------------------------------------------------------ */
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     4. Hero entrance
     ------------------------------------------------------------------ */
  var hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add("ready"); });
  }

  /* ------------------------------------------------------------------
     5. Scroll reveal + active nav (Intersection Observer)
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll("[data-reveal], .steps");

  function revealEl(el) {
    el.classList.add("revealed");
    // trigger connector line fill inside a revealed .steps container
    var steps = el.querySelector ? el.querySelector(".steps") : null;
    if (steps) steps.classList.add("revealed");
    if (el.classList.contains("steps")) el.classList.add("revealed");
  }

  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { revealEl(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(revealEl);
  }

  // Active nav link highlighting
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ------------------------------------------------------------------
     6. Installation tabs
     ------------------------------------------------------------------ */
  var tabButtons = document.querySelectorAll(".tab-btn");
  var tabPanels = document.querySelectorAll(".tab-panel");
  function activateTab(btn) {
    var target = btn.getAttribute("data-tab");
    tabButtons.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    tabPanels.forEach(function (p) {
      var on = p.id === "panel-" + target;
      p.classList.toggle("active", on);
      if (on) { p.removeAttribute("hidden"); }
      else { p.setAttribute("hidden", ""); }
    });
  }
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { activateTab(btn); });
    btn.addEventListener("keydown", function (e) {
      var i = Array.prototype.indexOf.call(tabButtons, btn);
      if (e.key === "ArrowRight") { e.preventDefault(); var n = tabButtons[(i + 1) % tabButtons.length]; n.focus(); activateTab(n); }
      if (e.key === "ArrowLeft") { e.preventDefault(); var p = tabButtons[(i - 1 + tabButtons.length) % tabButtons.length]; p.focus(); activateTab(p); }
    });
  });

  /* ------------------------------------------------------------------
     7. FAQ accordion (smooth, accessible)
     ------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";

      // Close siblings
      faqItems.forEach(function (other) {
        if (other === item) return;
        var ob = other.querySelector(".faq-question");
        var oa = other.querySelector(".faq-answer");
        if (ob && oa) { ob.setAttribute("aria-expanded", "false"); oa.style.maxHeight = null; }
      });

      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Keep open FAQ height correct on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (btn) {
      var answer = btn.parentNode.querySelector(".faq-answer");
      if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
    });
  });

  /* ------------------------------------------------------------------
     8. Troubleshooting: keep only one open at a time
     ------------------------------------------------------------------ */
  var tsItems = document.querySelectorAll(".ts-item");
  tsItems.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        tsItems.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  /* ------------------------------------------------------------------
     9. External link safety
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener");
  });

})();
