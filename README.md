# Xthetics Med Spa — Sage Design

Static website for Xthetics Med Spa (Teaneck & Woodbridge, NJ). Plain HTML, CSS and JavaScript. No build step and no dependencies.

```
index.html      page markup
css/style.css   styles
js/main.js      interactions and service data
assets/         images (logo, services, team)
```

## Run locally

Any static file server works. From the project folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on Vercel

Import this repo in Vercel and keep the defaults: Framework Preset **Other**, no build command, and the root directory as the output. `vercel.json` only turns on clean URLs.

## Before launch

The page is currently hidden from search engines. Remove this line from the `<head>` of `index.html` when the site is ready to go live:

```html
<meta name="robots" content="noindex, nofollow">
```
