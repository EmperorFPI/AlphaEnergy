# Alpha Energy — corporate website

Static, multi-page site in the Alpha Energy Latin America brand system
(Navy `#0B1F3A` · Gold `#C9A84C` · Red `#C0392B`; Playfair Display / Barlow /
Barlow Condensed; consortium stripe Gold → Red → Navy). No build step, no
framework — plain HTML/CSS/JS, deployable as-is.

## Structure

```
.
├── index.html                 Home
├── about.html
├── team.html
├── operations.html            Operations hub
├── corporate-structure.html   Group org chart
├── news.html
├── contact.html
├── 404.html
├── operations/
│   ├── alpha-technical-centre.html
│   ├── united-states.html
│   ├── tpic.html              TPIC (Texas Petroleum Investment Company) — 50% via Alpha Parker Creek
│   ├── ukraine.html
│   └── venezuela.html
├── assets/
│   ├── styles.css             Shared brand stylesheet
│   ├── app.js                 Mobile nav toggle + footer year
│   └── alpha-logo.png         Alpha Energy mark
├── .htaccess                  Custom 404 + security headers (Apache/Plesk)
├── robots.txt
└── sitemap.xml
```

All internal links and asset references use **root-absolute paths** (`/assets/…`,
`/operations/…`). This is correct for deployment at a domain root
(alpha.energy). If you ever deploy under a sub-path, switch to relative paths.

## Editing content

Every place that needs your input is flagged inline in gold as
`[EDIT: …]`. Search the project for `EDIT` to find them all. Nothing on the
site is fabricated — bios, contact details, exact entity domiciles, and any
figures requiring disclosure clearance are left as marked stubs.

To add a team member, operation card, or news item, duplicate the relevant
block (`.member`, `.card`, `.news-item`).

## Deploy — Plesk

Same as alphalatinamerica.com: a plain file upload, no build step, no git
integration required.

1. In Plesk, open the **alpha.energy** domain → **File Manager** (or connect
   via FTP/SFTP) and go to `httpdocs/`.
2. Upload the entire contents of this folder into `httpdocs/` (not the folder
   itself — `index.html` should sit directly in `httpdocs/`).
3. `.htaccess` is already included and provides the custom 404 page and
   security headers; Apache on Plesk picks it up automatically (requires
   `mod_headers`, enabled by default on most Plesk installs).
4. Confirm the domain's SSL/TLS certificate is issued (Let's Encrypt via
   Plesk) and done.

## Local preview

Root-absolute paths require serving from the project root — opening the HTML
files directly (`file://`) will not load the CSS/JS. Any static server works,
e.g. from this folder:

```
npx --yes serve -l 8000
```

Then open http://localhost:8000.

In VS Code, the **Live Preview** or **Live Server** extension works too —
right-click `index.html` → "Show Preview" / "Open with Live Server" — since
those serve the folder over HTTP rather than opening the file directly.
