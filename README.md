# FlockCalc — Backyard Poultry Calculators

A static, SEO-first Next.js site with five free calculators for backyard
chickens, quail and ducks. No backend, no database, no external fonts or
images — every page is statically generated and every calculator runs in the
browser.

## Run it

```bash
npm install
npm run dev      # local development at http://localhost:3000
npm run build    # production build (all 7 routes static)
npm run start    # serve the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (or run `vercel` in this folder).
2. Import it in Vercel — framework preset **Next.js**, no environment
   variables needed, default build command.
3. Point the domain's DNS at Vercel (A / CNAME records as Vercel instructs).
4. After launch, submit `https://flockcalc.com/sitemap.xml` in Google
   Search Console.

## Rename the brand (one-file change)

All brand values live in **`src/lib/site.ts`**: `name`, `domain`, `url`,
`tagline`, `description`, `contactEmail`. Edit those and every title,
canonical URL, Open Graph tag, sitemap entry, robots rule, JSON-LD block,
header and footer updates automatically. Also update the `"name"` field in
`package.json` to match (cosmetic only).

## Structure

```
src/
  lib/site.ts       Brand config + the tool registry (single source of truth)
  lib/math.ts       Shared poultry maths (coop space, feed, egg cost)
  lib/schema.ts     JSON-LD builders (WebApplication, FAQPage, BreadcrumbList)
  components/       Header, Footer, the 5 calculators, FAQ + related-tools blocks
  app/              One folder per route; sitemap.ts and robots.ts included
```

## The SEO formula on every tool page

Calculator above the fold → statically rendered results table for common
flock sizes → "How it works" with the formula and guideline sources → FAQ
(mirrored exactly in FAQPage JSON-LD) → links to the other four calculators →
print-friendly results.
