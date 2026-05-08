# Tobi John Olabode — FinOps Portfolio

A modern, responsive single-page portfolio site for a Cloud FinOps practitioner. Static, no build step, deploys to GitHub Pages in minutes.

## What's in this folder

```
.
├── index.html              # The whole site — open in any browser
├── 404.html                # Custom not-found page (GitHub Pages serves it automatically)
├── Tobi_Olabode_CV.pdf     # CV linked from the Download CV buttons
├── robots.txt              # Tells crawlers everything is indexable
├── sitemap.xml             # Search-engine sitemap
├── README.md               # This file
├── .nojekyll               # Tells GitHub Pages to skip Jekyll processing
├── deploy.bat              # One-click git init + push helper (Windows)
└── assets/
    └── screenshots/        # Drop your dashboard PNGs here (see README inside)
        └── README.md
```

## Quick start — view locally

Just double-click `index.html`. That's it. It uses CDN assets only (Tailwind, Font Awesome, Google Fonts) so there is no build step or `npm install`.

## Deploying to GitHub Pages

### Option A — User site (`tobiolabode.github.io`)

This gives you a clean URL like `https://<your-username>.github.io`.

1. Create a new public repo on GitHub named **exactly** `<your-username>.github.io` (e.g. `Johhnmarshal.github.io`).
2. Drop everything in this folder into the repo root and push:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Johhnmarshal/Johhnmarshal.github.io.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**. Under "Build and deployment", set **Source** = `Deploy from a branch`, **Branch** = `main`, folder = `/ (root)`. Click Save.
4. Wait ~1 minute. Your site will be live at `https://Johhnmarshal.github.io`.

### Option B — Project site (any repo name)

If you want it under an existing repo (e.g. `tobi-portfolio`):

1. Push the files to a public repo's `main` branch.
2. **Settings → Pages → Source** = `main` branch, `/ (root)`.
3. Site lives at `https://<username>.github.io/<repo-name>/`.

> If you go this route, dashboard screenshots and the CV download will still work because all paths are relative.

### Option C — Custom domain (optional)

After Option A or B is working:
1. Add a file named `CNAME` to the repo root with one line: `www.yourdomain.com`.
2. In your DNS provider, add a `CNAME` record pointing `www` to `<username>.github.io`.
3. In **Settings → Pages**, fill in your custom domain and tick "Enforce HTTPS".

## Adding your real dashboard screenshots

The site already renders polished SVG fallback previews so it looks complete out of the box. To swap in your real Power BI screenshots, drop these PNG files into `assets/screenshots/`:

| Filename | Used for |
|---|---|
| `finops-cost-summary.png` | Multi-Cloud FinOps Executive Dashboard (£16.72M / £8.35M / 26.17% ESR) |
| `finops-daily-cost.png` | Daily Cost Monitoring & Anomaly Detection |
| `gcp-cost-analysis.png` | GCP Cost & Discount Ratio Analysis |
| `ai-cost-summary.png` | Azure AI Cost Tracker |
| `azure-shadow-cost.png` | Azure Shadow Cost (optional — can be a logo or screenshot) |

The `<img onerror>` fallback means if a file is missing, the SVG mock shows automatically — so you can add them one by one.

**Tip:** export at roughly 1600×1000px PNG. Optimise with [tinypng.com](https://tinypng.com) before committing — keeps the page fast.

## Contact form — already wired and working

The form is pre-wired to **[FormSubmit.co](https://formsubmit.co)** — a free, no-signup service that just emails you when someone submits.

**How it works:**
- Form action: `https://formsubmit.co/ajax/oluwamarshal@gmail.com`
- The **first** time anyone submits the form after the site goes live, FormSubmit sends a one-time confirmation email to `oluwamarshal@gmail.com` — click the link inside to activate.
- After that, every form submission lands in your inbox automatically. No dashboard, no rate limits to speak of, no account.

**If JS or the network fails**, the form falls back to opening the visitor's email client with their message pre-filled — so it always works.

**Want to switch providers later?** Edit one line in `index.html`:

- [Formspree](https://formspree.io) (50/month free) — replace action with `https://formspree.io/f/YOUR_ID`
- [Web3Forms](https://web3forms.com) (250/month free) — needs an access key
- [Netlify Forms](https://www.netlify.com/products/forms/) (if you ever migrate off GitHub Pages)

The submit handler auto-detects FormSubmit vs. other providers and adjusts the request format.

## Updating the site

Change copy directly in `index.html` — sections are clearly commented (`<!-- ============= ABOUT ============= -->` etc.). Common edits:

- **Hero stats** — search for `data-target` to change the animated numbers.
- **Experience timeline** — each role is wrapped in a `<!-- Next Retail -->` style comment.
- **Case studies** — each is one `<article class="case-study">`. Duplicate one to add another.
- **Accent colour** — change `#14b8a6` (the teal) globally with find-replace if you want a different brand colour.

## Tech notes

- **No build step.** Pure HTML + CDN-loaded Tailwind and Font Awesome.
- **Accessibility.** Semantic landmarks, skip-link, ARIA on the menu, decent contrast, `prefers-reduced-motion` support.
- **Performance.** No frameworks, no bundle, lazy-loaded fonts. Images are the main weight — optimise screenshots before committing.
- **SEO.** Title, description, keywords, Open Graph tags all in the `<head>`.

## Licence

The CV and personal content are © Tobi John Olabode. The site scaffolding is yours to modify freely.
