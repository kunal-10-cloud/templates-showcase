# Emergent Templates Showcase

A static catalog page for Emergent's vertical software templates: 18 niches, each with a designed preview rendered in an iframe, and a hero slideshow of templates running on Emergent.

## Run it

No build step. Serve the folder with any static server:

```sh
python3 -m http.server 5173
# open http://localhost:5173
```

Or deploy the folder as-is to Netlify, Vercel, GitHub Pages or S3.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page: layout, styles, catalog data, slideshow, card logic |
| `landings/live.js` | Previews for the two live templates (Job OS, Dealer OS), matching the real apps |
| `landings/a.js`, `b.js`, `c.js` | Designed landing-page previews for the other niches |
| `mini-apps.js` | Fallback dashboard previews, plus business names used in preview URLs |
| `img/cars/` | Car photos used in the Dealer OS preview (see `CREDITS.txt`) |

## Edit links

At the top of the main script in `index.html`:

```js
const LINKS = {
  field: "https://app.emergent.sh/home?job_id=…",
  auto:  "https://app.emergent.sh/home?job_id=…",
  // one entry per template; others default to PLACEHOLDER
};
```

To show a running app inside a featured card instead of the designed preview, set `LIVE.<id>.preview` to its URL.

## Credits

Car photos are from Wikimedia Commons. The Ram 1500 (CC BY-SA 2.0) and Jeep Wrangler (CC BY-SA 4.0) photos need attribution if the page is published; details in `img/cars/CREDITS.txt`.
