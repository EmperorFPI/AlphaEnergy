# Alpha Energy — corporate website

Static, multi-page site in the Alpha Energy Latin America brand system
(Navy `#0B1F3A` · Gold `#C9A84C` · Red `#C0392B`; Playfair Display / Barlow /
Barlow Condensed; consortium stripe Gold → Red → Navy). No build step, no
framework — plain HTML/CSS/JS, deployable as-is.

## Structure

Everything served to the public lives in `public/`. Files outside it are
tooling and are never published.

```
.
├── public/                    ← the site; this is what Cloudflare serves
│   ├── index.html             Home
│   ├── about.html
│   ├── team.html
│   ├── operations.html        Operations hub
│   ├── corporate-structure.html   Group org chart
│   ├── news.html
│   ├── contact.html
│   ├── 404.html
│   ├── operations/
│   │   ├── alpha-technical-centre.html
│   │   ├── united-states.html
│   │   ├── tpic.html          TPIC (Texas Petroleum Investment Company) — 50% via Alpha Parker Creek
│   │   ├── ukraine.html
│   │   └── venezuela.html
│   ├── assets/
│   │   ├── styles.css         Shared brand stylesheet
│   │   ├── app.js             Mobile nav toggle + footer year
│   │   ├── alpha-logo.jpg     Alpha Energy mark
│   │   ├── favicon.png
│   │   └── video/hero-oil-gas.mp4
│   ├── _headers               Security + cache headers (Cloudflare)
│   ├── robots.txt
│   └── sitemap.xml
├── wrangler.jsonc             Cloudflare Worker config
└── package.json               Pins wrangler; npm scripts
```

Internal links and asset references use **root-absolute, extension-less
paths** (`/about`, `/operations/ukraine`, `/assets/…`) — Cloudflare resolves
`/about` to `public/about.html`. This assumes deployment at a domain root
(alpha.energy); if you ever deploy under a sub-path, switch to relative paths.

## Editing content

Every place that needs your input is flagged inline in gold as
`[EDIT: …]`. Search the project for `EDIT` to find them all. Nothing on the
site is fabricated — bios, contact details, exact entity domiciles, and any
figures requiring disclosure clearance are left as marked stubs.

To add a team member, operation card, or news item, duplicate the relevant
block (`.member`, `.card`, `.news-item`).

## Deploy — Cloudflare Workers

The site is a static-assets-only Worker: no server code, no build step.
Cloudflare serves `public/` straight off its edge network.

### One-time setup (deploy on git push)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
   repository** → pick this repo.
3. Build settings:
   - **Build command:** *(leave empty)*
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
4. Deploy. Every push to `main` redeploys automatically.
5. **Workers** → `alpha-energy` → **Settings** → **Domains & Routes** → add
   the custom domain `alpha.energy` (and `www.alpha.energy`). Cloudflare
   issues the TLS certificate; the domain's nameservers must already point at
   Cloudflare.

### Deploying by hand

```
npm install
npx wrangler login   # first time only
npm run deploy
```

### How requests are routed

`wrangler.jsonc` sets `html_handling: "auto-trailing-slash"` and
`not_found_handling: "404-page"`:

| Request | Result |
| --- | --- |
| `/` | `public/index.html` |
| `/about` | `public/about.html` |
| `/about.html` | 307 → `/about` |
| anything unmatched | `public/404.html` with a 404 status |

The site links to the extension-less form, so navigation never takes a
redirect. Old `*.html` URLs from search results or bookmarks still resolve via
the 307, so no redirect rules are needed for the migration.

`public/_headers` supplies the security headers, plus a one-hour browser cache
on `/assets/*`. Its rules are **appended** when several match one request, so
do not add a narrower rule that overlaps `/assets/*` — you get a doubled
`Cache-Control` value.

## Local preview

Root-absolute paths require serving from `public/` — opening the HTML files
directly (`file://`) will not load the CSS/JS. Use Wrangler, which reproduces
the real routing, `_headers`, and 404 behaviour locally:

```
npm install
npm run dev
```

Then open http://localhost:8787. Any plain static server also works
(`npx --yes serve public -l 8000`), but it will not apply `_headers` or the
extension-less URL handling.

In VS Code, the **Live Preview** or **Live Server** extension works too —
right-click `index.html` → "Show Preview" / "Open with Live Server" — since
those serve the folder over HTTP rather than opening the file directly.
