# Tapilly — NFC tag store

Storefront for [Tapilly](https://www.instagram.com/tapilly.lb/) (Tap + Happily): smart NFC tags for businesses in Lebanon, $25 per tag.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion and Lenis smooth scrolling. Videos are made in code with [Remotion](https://www.remotion.dev/).

## Features

- Hero with a seamless 12 s product film: a phone taps the stand and opens Google Reviews, Instagram, WhatsApp and a menu, each tap flooding the frame with that channel's colour
- Product collection with category filters, hover format swap, quick add and a product modal (stand / card format, quantity)
- Cart drawer with a free-delivery progress bar, persisted in `localStorage`
- Checkout that sends a pre-filled order to Tapilly's WhatsApp (+961 76 693 639), so no payment backend is needed
- Scroll-pinned "How it works" story scrubbed frame-by-frame by scroll (a live Remotion player), pinned horizontal industries row, bento features, a scroll-highlighted statement, an industries carousel, pricing packs, Instagram feed, FAQ
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

### Videos (`video/`)

A separate Remotion project. The website imports its scenes directly, so the hero film, the scroll story and the promo reel share one set of components.

| Composition | Size | Use |
|---|---|---|
| `HeroLoop` | 1080×1350, 12 s seamless loop, silent | website hero (`public/video/hero.*`) |
| `TapStory` | 1080×1080, 5 s | "How it works", played live and scrubbed by scroll |
| `Promo` / `PromoNoMusic` | 1080×1920, 16.5 s, with sound | Instagram Reels / TikTok |

```bash
cd video && npm install
npm run studio                          # preview and tweak in Remotion Studio
node render.mjs                         # render every composition to video/out/
node render.mjs HeroLoop 0,30,90        # render stills for review
```

Timing lives in `video/src/timing.js`, channel colours and copy in `video/src/theme.js`, and the soundtrack cue sheets in `video/sound/*.json` (synthesized; UI sounds in `video/sound/sfx` are CC0).
After re-rendering `HeroLoop`, re-encode it for the web:

```bash
ffmpeg -i video/out/HeroLoop.mp4 -vf scale=900:-2 -c:v libx264 -crf 25 -preset slow -movflags +faststart -an public/video/hero.mp4
ffmpeg -i video/out/HeroLoop.mp4 -vf scale=900:-2 -c:v libvpx-vp9 -b:v 0 -crf 36 -an public/video/hero.webm
```

Remotion is free for individuals and companies of up to 3 people; larger companies need a [company license](https://remotion.dev/license).

## Deployment

Every push to `main` or `claude/brave-carson-0gtn2u` builds the site and publishes `dist/` to the `gh-pages` branch through [the deploy workflow](.github/workflows/deploy.yml).
If the site does not show up after the first run, go to **Settings → Pages → Build and deployment** and set Source to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.

Live URL: https://omarnaous.github.io/Tappily/
