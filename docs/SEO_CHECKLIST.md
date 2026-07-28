# SEO Release Checklist

Use this checklist for every production change involving pages, routes, metadata, redirects, internal links, or destination catalogs.

## Before Deployment

- [ ] Every intended indexable HTML page has a unique title and description.
- [ ] Every intended indexable HTML page has a self-referencing canonical URL on `https://www.ontimer.app`.
- [ ] Every intended indexable content page appears in `src/app/sitemap.ts`.
- [ ] Utility, spam, test, preview, and private tool pages are excluded from the sitemap unless explicitly intended for search.
- [ ] Sitemap pages do not use `noindex`.
- [ ] Internal links point directly to canonical routes and do not depend on redirects.
- [ ] Redirects are permanent only when the destination is genuinely canonical.
- [ ] Redirect destinations use the canonical `www.ontimer.app` hostname and avoid redirect chains.
- [ ] Airport destinations use `/airport-time-to-leave/[slug]`.
- [ ] Cruise terminals use `/cruise-time-to-leave/[slug]`.
- [ ] Unknown destination slugs return 404; known legacy or misclassified URLs redirect to the correct canonical page.
- [ ] `npm run build` passes.

## After Deployment

- [ ] Run `npm run audit:site` against production.
- [ ] Confirm all sitemap URLs return 200.
- [ ] Confirm internal links contain no 4xx/5xx responses.
- [ ] Confirm internal links do not route through avoidable redirects.
- [ ] Confirm no sitemap canonical is missing or mismatched.
- [ ] Confirm no sitemap page is marked `noindex`.
- [ ] Confirm no airport/cruise destination is linked under the wrong route family.
- [ ] Spot-check the changed page in a browser.
- [ ] Record the outcome and verification in `docs/SITE_CHANGELOG.md`.

## Search Console Follow-Up

- [ ] For corrected 404, redirect, canonical, or indexing issues, use **Validate Fix** in Google Search Console.
- [ ] Allow Google time to recrawl; a clean live audit does not immediately clear historical Search Console reports.
