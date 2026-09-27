# Mohamed Karouch — Developer Portfolio 🚀

A modern, high-performance personal portfolio website for **Mohamed Karouch** — Freelance Web Developer and Software Engineering Student at **1337 Coding School (42 Network)**.

🌐 **Live URL**: [https://karouchmohamed.netlify.app/](https://karouchmohamed.netlify.app/)  
📂 **Repository**: [https://github.com/MaximosMK/my-portfolio-website](https://github.com/MaximosMK/my-portfolio-website)

---

## 📑 Table of Contents
1. [Architecture & Philosophy](#-architecture--philosophy)
2. [Project Structure](#-project-structure)
3. [Performance & Speed Optimizations ("Fast ASF")](#-performance--speed-optimizations)
4. [Modular System Breakdown](#-modular-system-breakdown)
   - [CSS Architecture](#css-architecture)
   - [JavaScript Architecture](#javascript-architecture)
5. [Interactive Features & Tools](#-interactive-features--tools)
6. [SEO & Search Engine Configuration](#-seo--search-engine-configuration)
7. [Deployment & Netlify Operations](#-deployment--netlify-operations)
8. [Maintenance Guide for Future Updates](#-maintenance-guide-for-future-updates)

---

## 🏛 Architecture & Philosophy

The codebase is built entirely with **Vanilla Web Technologies** (HTML5, Modern CSS3 with Design Tokens, and ES6+ JavaScript), free of bulky frameworks or external runtime dependencies.

### 📏 The < 1,000 Lines Constraint
To ensure maintainability, rapid debugging, and clean separation of concerns, **every code file in this repository strictly adheres to a maximum of 1,000 lines**.
- Monolithic `style.css` (originally 5,238 lines) was partitioned into **9 focused CSS modules**.
- Monolithic `script.js` (originally 2,185 lines) was partitioned into **4 high-cohesion JS modules**.
- `index.html` was streamlined from 2,184 lines to **< 1,000 lines** by moving static modal DOM trees to dynamic on-demand mounters.

---

## 📁 Project Structure

```text
my-portfolio-website/
├── index.html                 # Main single-page application shell (< 1,000 lines)
├── maintenance.html           # Netlify emergency maintenance page
├── README.md                  # Project documentation & maintainer guide
├── robots.txt                 # Search engine crawler policies
├── sitemap.xml                # Google Search Console XML sitemap
├── netlify.toml               # Edge headers, caching, and build configuration
├── _redirects                 # Instant maintenance toggle redirect rules
├── sw.js                      # Service Worker v5 (offline shell & precaching)
├── css/                       # Modular stylesheets (All < 1,000 lines)
│   ├── base.css               # Design tokens, themes, typography, buttons
│   ├── header.css             # Glass navigation, mobile drawer
│   ├── hero.css               # Hero split, typing terminal, metric counters
│   ├── about-skills-services.css # Bio, interactive skills matrix, services
│   ├── projects-journey.css   # Project cards, journey timeline, education
│   ├── contact-faq.css        # Multi-step inquiry stepper, FAQ accordion
│   ├── modals-tools.css       # Modals, dev console, command palette UI
│   ├── footer.css             # Footer layout, floating quick dock
│   ├── responsive.css         # Breakpoints, mobile tweaks, accessibility
│   └── style.css              # Master @import aggregator for backwards compatibility
├── js/                        # Modular scripts (All < 1,000 lines)
│   ├── sound-theme.js         # Web Audio API sound synthesis, theme toggler
│   ├── components.js          # Project & Resume modals, particle canvas, 3D tilt
│   ├── tools.js               # Dev console terminal, Command Palette (⌘K), Scope calc
│   ├── main.js                # Core flow: nav, filters, forms, AOS, PWA init
│   └── script.js              # Aggregator script reference
├── images/                    # Project thumbnails, previews, author portraits
└── logo/                      # Favicons, WebApp manifest, icons
```

---

## ⚡ Performance & Speed Optimizations

The site is engineered for near-instant rendering and high Core Web Vitals (LCP, INP, CLS):

1. **HTTP/2 Parallel Asset Streaming**:
   - Eliminated slow CSS `@import` waterfalls. All stylesheets are linked directly in `<head>`, allowing concurrent downloading in a single network round-trip.
2. **Non-Blocking JavaScript (`defer`)**:
   - All scripts (`sound-theme.js`, `components.js`, `tools.js`, `main.js`) load with `defer`. HTML rendering is never blocked.
3. **Dynamic On-Demand Modal Mounting**:
   - Heavy modal components (Developer Console, Command Palette, Project Modal, Resume Modal) are injected into the DOM dynamically upon user invocation.
4. **Aggressive Edge Caching (Netlify)**:
   - Configured in `netlify.toml`: CSS and JS assets are served with `Cache-Control: public, max-age=31536000, immutable`.
5. **Modern Service Worker Shell (`v5`)**:
   - [sw.js](sw.js) precaches all modular assets for instant repeat visits and full offline resilience.

---

## 🧩 Modular System Breakdown

### CSS Architecture
| File | Focus / Contents |
| :--- | :--- |
| `css/base.css` | Color tokens (dark/light), typography, CSS resets, button primitives |
| `css/header.css` | Sticky glassmorphic navbar, desktop links, mobile hamburger menu |
| `css/hero.css` | Split grid, animated code preview, metrics bar, cursor follower |
| `css/about-skills-services.css` | About story, interactive skills tabs, service offering cards |
| `css/projects-journey.css` | Project showcase grid, work journey timeline, education history |
| `css/contact-faq.css` | Multi-step contact form, WhatsApp & Email dispatchers, FAQ |
| `css/modals-tools.css` | Project details modal, Developer Console, `⌘K` palette |
| `css/footer.css` | Footer links, legal notice, floating quick dock |
| `css/responsive.css` | Responsive media queries across screen sizes, reduced-motion rules |

### JavaScript Architecture
| File | Focus / Contents |
| :--- | :--- |
| `js/sound-theme.js` | Synthesized click/switch sound effects via Web Audio API, dark/light theme switcher, reading scroll progress bar |
| `js/components.js` | Dynamic Project modal, dynamic Resume modal, 3D card tilt, particle canvas animation |
| `js/tools.js` | Project Scope & Price Calculator, Developer CLI Terminal, Command Palette (`⌘K` / `Ctrl+K`) |
| `js/main.js` | Smooth navigation, project category filtering, WhatsApp inquiry stepper, Contact form handler, FAQ accordion, Service Worker registration |

---

## 🛠 Interactive Features & Tools

- **Command Palette (`⌘K` / `Ctrl+K`)**: Instant search and navigation across all sections, projects, and actions.
- **Developer Console**: An interactive terminal CLI accessible via keyboard or UI button. Supports commands: `help`, `skills`, `projects`, `contact`, `theme`, `clear`, `cat`.
- **Project Scope & Price Estimator**: Real-time project cost calculator with custom feature toggles, estimated delivery timelines, and direct quote submission.
- **Multi-Step WhatsApp Inquiry Stepper**: Guided stepper allowing clients to formulate project specifications and launch an instant pre-filled WhatsApp message.
- **Web Audio Sound Effects**: Subtle audio feedback powered natively by the Web Audio API (no external MP3/WAV files required).

---

## 🔍 SEO & Search Engine Configuration

- **Structured Data (Schema.org)**: Complete JSON-LD graph declaring `Person`, `WebSite`, `ContactPage`, and `Service` types.
- **Social Metadata**: Rich OpenGraph and Twitter Cards configured with preview images and site descriptions.
- **Crawler Directives**: [robots.txt](robots.txt) grants full access to Googlebot, Bingbot, and Googlebot-Image while protecting repository internals.
- **XML Sitemap**: [sitemap.xml](sitemap.xml) indexes root and maintenance pages, including Google Image extensions for project thumbnails.
- **Google Search Console**: Meta verification tag placeholder configured in `<head>` of `index.html`.

---

## 🚀 Deployment & Netlify Operations

### Automatic Deployments
The repository is wired to Netlify via continuous deployment. Pushing to `main` automatically triggers an edge deploy:
```bash
git add .
git commit -m "Update feature or content"
git push origin main
```

### Emergency Maintenance Mode
To temporarily put the live site into maintenance mode:
1. Open `_redirects`.
2. Uncomment the maintenance rule:
   ```text
   /*    /maintenance.html   302!
   ```
3. Commit and push. The live site will instantly redirect all traffic to `maintenance.html`.
4. Comment it out again to restore full access.

---

## 📝 Maintenance Guide for Future Updates

1. **Keep Files Under 1,000 Lines**:
   - If adding substantial new styles, add them to the relevant modular file (e.g. `css/projects-journey.css` or `css/modals-tools.css`).
   - If adding new interactive tools, place logic inside `js/tools.js` or `js/components.js`.
2. **Adding a New Project**:
   - Add the card HTML into `#projects` inside `index.html`.
   - Add the project's detailed modal data into the `PROJECT_DATA` dictionary in `js/components.js`.
3. **Updating the Service Worker**:
   - When modifying core CSS or JS files, increment `CACHE_NAME` in `sw.js` (e.g., from `mk-portfolio-v5` to `mk-portfolio-v6`) to ensure returning visitors immediately receive updated caches.

---

## 🔒 License & Intellectual Property Rights

**Copyright © 2026 Mohamed Karouch (MaximosMK). All Rights Reserved.**

This repository and its contents (including design system, branding, codebase, typography, text, and project showcase assets) are strictly proprietary:
- **No Unauthorized Duplication**: You may not copy, replicate, or host this website or any of its design elements for commercial or personal portfolio use.
- **No Direct Modification**: GitHub's access controls restrict write/push access strictly to the repository owner. Unauthorized pull requests or modifications will not be accepted.
- **Educational Inspection Only**: You are welcome to view and review the codebase for personal learning and technical evaluation.

For collaboration or licensing inquiries, please contact [karouchmohamed21@gmail.com](mailto:karouchmohamed21@gmail.com).

