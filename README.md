# Jahidul Islam Refat — Portfolio

A modern, responsive developer portfolio built with plain **HTML5, CSS3 and vanilla JavaScript**. No framework, no build step, no backend.

```
refat-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── profile.jpg            (your original photo, unmodified)
    ├── anha-project.png
    ├── fitlog-project.png
    └── devstack-project.png
```

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
The only external resource is the Google Fonts stylesheet; the site falls back to system fonts if it is unavailable.

## Features

- Responsive layout with mobile hamburger menu (Esc closes it)
- Light/dark theme toggle, remembered between visits and applied before first paint
- Project filters (All / Full-Stack / Frontend)
- Smooth scrolling, active-section nav highlight, scroll-to-top button, reveal-on-scroll animations
- Keyboard accessible, skip link, visible focus styles, `prefers-reduced-motion` support

## Profile photo

`assets/profile.jpg` is your original file, untouched. It sits alone inside a rounded frame in the hero section; no text or labels are ever placed over it. To change it, replace the file (keep the name) or edit the `src` in the `.portrait-frame` block of `index.html`.

## Project links

All links are set in `SITE_LINKS` at the top of `script.js`:

| Project | GitHub | Live demo |
|---|---|---|
| Anha Construction Management System | github.com/jahidrefat238-oss/anha-construction-management-system | none |
| FitLog — Fitness Tracking App | github.com/jahidrefat238-oss/Assignment6 | assignment6-git-main-refat3.vercel.app |
| Dev Stack — Development Stack Builder | github.com/jahidrefat238-oss/assignment5 | assignment5-devstack.vercel.app |

A button is hidden automatically when its URL is empty or missing, so Anha shows only a GitHub button. If you later deploy Anha, add `PROJECT_1_DEMO_URL` in `script.js` and a matching Live Demo `<a data-link="PROJECT_1_DEMO_URL" ...>` button in the Anha card.

## Editing content

- **Skills:** each skill is one `<li>` in the Skills section of `index.html`.
- **Projects:** each is an `<article class="project-card">`. `data-category` drives the filters; `data-accent` (`anha`, `fitlog`, `devstack`) sets the card's colour accent.
- **Contact:** search `index.html` for `jahidrefat238@gmail.com`.

## Deploy to GitHub Pages

Upload this folder's contents to a repository so `index.html` is at the root, then go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`.
