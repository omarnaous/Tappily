# Tapilly — NFC tag store

Storefront for [Tapilly](https://www.instagram.com/tapilly.lb/) (Tap + Happily): smart NFC tags for businesses in Lebanon, $25 per tag.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion and Lenis smooth scrolling.

## Features

- Full-bleed looping hero video (rendered from code, see below)
- Product collection with category filters, hover format swap, quick add and a product modal (stand / card format, quantity)
- Cart drawer with a free-delivery progress bar, persisted in `localStorage`
- Checkout that sends a pre-filled order to Tapilly's WhatsApp (+961 76 693 639), so no payment backend is needed
- Scroll-pinned "How it works" story, bento features, a scroll-highlighted statement, an industries carousel, pricing packs, Instagram feed, FAQ
- Mobile sticky shop bar; respects `prefers-reduced-motion`

## Editing content

All store content lives in [`src/data/site.js`](src/data/site.js): price, products, packs, FAQ, contact details, and the free-delivery threshold.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run lint
```

### Hero video

`public/video/hero.{mp4,webm}` is rendered from [`tools/hero-video/scene.html`](tools/hero-video/scene.html) with Playwright and ffmpeg:

```bash
npm run hero-video   # needs a Chromium (CHROMIUM_PATH) and ffmpeg
```

## Deployment

Every push to `main` or `claude/brave-carson-0gtn2u` builds the site and publishes `dist/` to the `gh-pages` branch through [the deploy workflow](.github/workflows/deploy.yml).
If the site does not show up after the first run, go to **Settings → Pages → Build and deployment** and set Source to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.

Live URL: https://omarnaous.github.io/Tappily/
