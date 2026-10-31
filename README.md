# FlockCalc

Free calculators for backyard chickens, quail and ducks — coop/cage sizes, how many hens you need, and cost per egg.

Next.js 15 (App Router) + TypeScript, statically generated, no backend. Design: Swiss/minimal system (Lexend + Source Sans 3) built with the UI UX Pro Max skill.

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
