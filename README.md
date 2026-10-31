# FlockCalc

Free calculators for backyard chickens, quail and ducks — coop/cage sizes, how many hens you need, and cost per egg.

Next.js 15 (App Router) + TypeScript, statically generated, no backend. Design language: DM Serif Display + DM Sans on cream (#FBF8F1) with ink (#10231A) 2px borders and amber (#F4B31F) hard offset shadows.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy

Deployed on Vercel (project `flockcalc`). Production URL: https://flockcalc-red.vercel.app — custom domain flockcalc.site to be attached later.

## Rename the brand

Edit `src/lib/site.ts` (name, domain, url, contact email) and the `name` field in `package.json`. Everything else — metadata, canonicals, sitemap, robots, JSON-LD, header, footer — reads from that one file.
