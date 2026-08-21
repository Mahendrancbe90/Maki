# Mahendran — Portfolio Website

Senior UI/UX Designer & Product Designer portfolio. Static HTML5 / CSS3 / vanilla JavaScript — no build step, no framework, deployable anywhere that serves static files.

---

## 1. Project Setup

No installation required. This is a plain static site — every dependency (fonts) loads from a CDN at runtime.

```bash
git clone [Add repository URL]
cd mahendran-portfolio
```

That's it. There is no `npm install` step.

---

## 2. Local Development

Any static file server works. Recommended: **VS Code Live Server** extension.

1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The site opens at `http://127.0.0.1:5500` (or similar) with auto-reload on save.

**Alternative (no VS Code):**

```bash
# Python 3
python3 -m http.server 5500

# Node (if you have npx available)
npx serve .
```

Then visit `http://localhost:5500`.

Because every internal link uses **relative paths**, the site works identically whether opened via Live Server, a plain `file://` double-click, or once deployed — no path rewriting needed.

---

## 3. Folder Structure

```
mahendran-portfolio/
│
├── index.html                 Home
├── projects.html             Project archive (filterable)
├── projecte-fitxa.html        Case study template (reads ?project=slug)
├── about.html             About
├── contact.html             Contact
├── 404.html                   Custom not-found page
├── robots.txt
├── sitemap.xml                Placeholder — fill in production domain
├── README.md
│
└── assets/
    ├── css/
    │   ├── style.css          Design tokens + all components
    │   ├── responsive.css     Breakpoints (360px → 1920px)
    │   └── animations.css     Reveals, marquee, mask reveal, cursor
    ├── js/
    │   ├── projects.js        Single source of truth for all case studies
    │   ├── animations.js      Scroll reveal, counters, magnetic buttons
    │   └── main.js            Nav, loader, work list, filters, forms, router
    ├── images/
    │   ├── hero/  projects/  profile/  textures/  icons/
    │   └── favicon/favicon.svg
    └── fonts/                 Empty — see "Fonts" note below
```

**Fonts:** the site currently loads Clash Display (via Fontshare CDN) and IBM Plex Mono + Switzer (via Google Fonts / Fontshare CDN) at runtime — no local font files are required. If you later want to self-host fonts for offline use or stricter privacy/performance control, drop `.woff2` files into `assets/fonts/` and swap the `<link>` tags in each page's `<head>` for local `@font-face` rules in `style.css`.

---

## 4. GitHub Upload Instructions

```bash
git init
git add .
git commit -m "feat: initial production-ready portfolio"
git branch -M main
git remote add origin [Add GitHub repository URL]
git push -u origin main
```

If the repository already exists remotely:

```bash
git remote add origin [Add GitHub repository URL]
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 5. Cloudflare Pages Deployment

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select the `mahendran-portfolio` GitHub repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty — there is no build step)*
   - **Build output directory:** `/`
4. Click **Save and Deploy**. Cloudflare serves the repo root directly.
5. Every push to `main` (or your chosen production branch) triggers an automatic redeploy.

**Netlify (alternative):** drag-and-drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo with the same empty build command and `/` publish directory.

**GitHub Pages (alternative):** repo **Settings → Pages → Deploy from a branch → main → / (root)**.

---

## 6. Custom Domain Setup

**On Cloudflare Pages:**

1. Project → **Custom domains** → **Set up a custom domain**.
2. Enter your domain (e.g. `mahendran.design`).
3. If the domain's DNS is already on Cloudflare, the CNAME is added automatically.
4. If DNS is elsewhere, add the CNAME record Cloudflare shows you at your registrar, pointing to `[project].pages.dev`.
5. HTTPS certificates are issued and renewed automatically — no manual step required.

**After the domain is live**, update these placeholders throughout the project:

- `<link rel="canonical">` in every page's `<head>`
- `og:url` / canonical references
- `robots.txt` → `Sitemap:` line
- `sitemap.xml` → every `<loc>` value

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Blank page, console shows `PROJECTS is not defined` | `assets/js/projects.js` didn't load before `main.js` | Confirm script order in `<body>`: `projects.js` → `animations.js` → `main.js` |
| Case study page shows "Loading…" forever | Missing or mistyped `?project=slug` | Check the slug matches one in `assets/js/projects.js` exactly (e.g. `jewel-one`) |
| Styles missing after deploy | Path case-sensitivity (Linux hosts are case-sensitive; local Windows/Mac dev may not be) | Ensure filenames and `<link>`/`<script>` paths match case exactly |
| Fonts flash or fail to load | CDN blocked by network/firewall | Self-host fonts in `assets/fonts/` (see Fonts note above) |
| Mobile menu won't close | JS error earlier in the page blocked execution | Open browser console, fix the first reported error — later handlers won't run until it's resolved |

---

## 8. Updating The Website

**Add or edit a project:** edit the relevant object in `assets/js/projects.js` — it drives the homepage work list, the archive grid, and the case study page automatically. No HTML duplication needed.

**Add a new page:** copy the `<nav>`, `<div class="mobile-menu">`, and `<footer>` blocks verbatim from an existing page (there's no server-side include, so shared markup is duplicated by design — see Git Workflow commit convention below when doing this).

**Replace placeholder content:** search the project for `[Add ` to find every marked placeholder (résumé path, social URLs, unverified metrics, canonical domain, etc.) before going live.

---

## Git Workflow

```
main          → active development
  ↓
production    → what's actually deployed (Cloudflare Pages watches this branch)
```

```bash
# day-to-day work happens on main or feature branches off main
git checkout -b feat/add-case-study-metrics
git commit -m "feat: add verified metrics to Jewel One case study"
git push origin feat/add-case-study-metrics
# open a PR into main, review, merge

# when ready to ship:
git checkout production
git merge main
git push origin production
```

**Commit message convention:**

```
feat: update portfolio hero
feat: add case study
fix: mobile navigation
perf: optimize images
seo: improve metadata
```

---

## Performance & Quality Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 90+ |

**Already in place:** system-native scroll behavior with `prefers-reduced-motion` support, `transform`/`opacity`-only animations, semantic landmarks (`<nav>`, `<main>`, `<footer>`), skip-to-content link, visible focus states, 44px minimum touch targets, no render-blocking JS (scripts load at end of `<body>`), `font-display: swap` via the CDN font links.

**Do before shipping real photography:** every `<img>` you add should include `width`, `height` (or `aspect-ratio` in CSS) to prevent layout shift, `loading="lazy"` for anything below the fold, `decoding="async"`, and a real `alt` description. Prefer `.webp` with a `.jpg` fallback via `<picture>` for photos; keep the existing inline SVGs for graphics/mockups since they're already zero-request and infinitely scalable.

---

## Content Integrity Note

All project metrics, timelines, and years currently marked `[Add …]` or `[Verify]` in `assets/js/projects.js` and elsewhere are intentional placeholders — no results, clients, or statistics have been invented. Replace them with confirmed figures before publishing; do not fill them with estimates presented as fact.
