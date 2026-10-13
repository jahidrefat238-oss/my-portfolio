/* =========================================================
   Portfolio scripts — Jahidul Islam Refat
   Vanilla JavaScript, no dependencies.
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURATION — edit the links below.
   Replace each PLACEHOLDER with a full URL starting with
   https://  (for example "https://github.com/you/repo").
   Anything that is not a real http(s) URL is hidden on the
   page, so nothing ever points to "#".
   --------------------------------------------------------- */
const SITE_LINKS = {
  PROJECT_1_GITHUB_URL: "https://github.com/jahidrefat238-oss/anha-construction-management-system", // no live demo for Anha
  PROJECT_2_GITHUB_URL: "https://github.com/jahidrefat238-oss/Assignment6",
  PROJECT_2_DEMO_URL: "https://assignment6-git-main-refat3.vercel.app/",
  PROJECT_3_GITHUB_URL: "https://github.com/jahidrefat238-oss/assignment5",
  PROJECT_3_DEMO_URL: "https://assignment5-devstack.vercel.app/",
  FACEBOOK_URL: "https://www.facebook.com/jahidrefat.refat.5"
};

(function () {
  "use strict";

  // Tell the CSS that JavaScript is running (enables reveal animations).
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 820px)");

  /* ---------- 1. Configured links ---------- */
  function isRealUrl(value) {
    return typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim());
  }

  function applyConfiguredLinks() {
    document.querySelectorAll("[data-link]").forEach(function (anchor) {
      const url = SITE_LINKS[anchor.dataset.link];
      if (isRealUrl(url)) {
        anchor.href = url.trim();
        anchor.hidden = false;
      } else {
        anchor.hidden = true;
        anchor.removeAttribute("href");
      }
    });

    // If a project card has no visible links, say so honestly.
    document.querySelectorAll(".project-links").forEach(function (box) {
      const hasVisibleLink = box.querySelector("a:not([hidden])");
      if (!hasVisibleLink) {
        const note = document.createElement("p");
        note.className = "links-note";
        note.textContent = "Links coming soon.";
        box.appendChild(note);
      }
    });
  }

  /* ---------- 2. Theme toggle (saved in localStorage) ---------- */
  const THEME_KEY = "portfolio-theme";
  const themeButton = document.getElementById("theme-toggle");

  function readSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch (error) {
      return null; // storage can be blocked; fall back silently
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  function initTheme() {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(readSavedTheme() || (systemDark ? "dark" : "light"));

    if (!themeButton) return;
    themeButton.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* ignore: preference just will not be saved */
      }
    });
  }

  /* ---------- 3. Mobile navigation ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("primary-nav");

  function setMenuOpen(open) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function initNav() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", function () {
      setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link.
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenuOpen(false); });
    });

    // Close with the Escape key and return focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    // Close when clicking outside the header.
    document.addEventListener("click", function (event) {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (!event.target.closest("#site-header")) setMenuOpen(false);
    });

    // Reset when moving to a desktop width.
    mobileQuery.addEventListener("change", function (event) {
      if (!event.matches) setMenuOpen(false);
    });
  }

  /* ---------- 4. Header shadow + scroll-to-top button ---------- */
  const header = document.getElementById("site-header");
  const toTopButton = document.getElementById("to-top");

  function onScroll() {
    const scrolled = window.scrollY > 10;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (toTopButton) toTopButton.hidden = window.scrollY < 500;
  }

  function initScroll() {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toTopButton) {
      toTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- 5. Active navigation link ---------- */
  function initActiveNav() {
    const links = document.querySelectorAll(".nav-links a[data-nav]");
    const sections = Array.prototype.slice.call(links)
      .map(function (link) { return document.getElementById(link.dataset.nav); })
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    function setActive(id) {
      links.forEach(function (link) {
        const isActive = link.dataset.nav === id;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }

    // A section becomes "active" when it crosses the middle of the viewport.
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- 6. Project filter ---------- */
  function initProjectFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const status = document.getElementById("filter-status");
    if (buttons.length === 0 || cards.length === 0) return;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        let shown = 0;

        buttons.forEach(function (other) {
          const isActive = other === button;
          other.classList.toggle("is-active", isActive);
          other.setAttribute("aria-pressed", String(isActive));
        });

        cards.forEach(function (card) {
          const match = filter === "all" || card.dataset.category === filter;
          card.hidden = !match;
          if (match) shown += 1;
        });

        if (status) {
          status.textContent = "Showing " + shown + (shown === 1 ? " project" : " projects");
        }
      });
    });
  }

  /* ---------- 7. Reveal on scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ---------- 8. Images that fail to load ---------- */
  function initImageFallbacks() {
    document.querySelectorAll("img").forEach(function (img) {
      function markBroken() { img.classList.add("is-broken"); }
      img.addEventListener("error", markBroken);
      if (img.complete && img.naturalWidth === 0) markBroken();
    });
  }

  /* ---------- 9. Footer year ---------- */
  function initYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Start everything ---------- */
  function init() {
    applyConfiguredLinks();
    initTheme();
    initNav();
    initScroll();
    initActiveNav();
    initProjectFilter();
    initReveal();
    initImageFallbacks();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
