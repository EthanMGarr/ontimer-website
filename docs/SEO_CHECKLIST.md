# SEO Release Checklist

Use this checklist for every production change involving pages, routes, metadata, redirects, internal links, or destination catalogs.

## Before Deployment

- [ ] Destination-page copy speaks directly to the traveler; remove publisher language such as content classifications, template logic, SEO rationale, or instructions aimed at search engines.
- [ ] Every airport-specific statement explains what the fact changes for the traveler: route choice, leave time, arrival target, transfer, parking, security, or walking time.
- [ ] International catalog records pass the contextual-texture validator: at least four substantial airport-specific facts with no exact reuse between airports.
- [ ] Read every new destination page top to bottom as a human task flow. Unique facts alone are not sufficient if the page sounds generated, repetitive, or internally focused.
- [ ] Every indexable destination has a review date and at least two authoritative sources; do not weaken the profile validator to ship an incomplete page.
- [ ] Non-U.S. airport pages use airport-security language and hide TSA PreCheck/CLEAR controls unless the program actually applies.
- [ ] For catalog expansions, spot-check different airport patterns (split terminals, rail-first, single-terminal and road-dependent) at 320, 375, 414 and 768 px.
- [ ] Every intended indexable HTML page has a unique title and description.
- [ ] Every intended indexable HTML page has a self-referencing canonical URL on `https://www.ontimer.app`.
- [ ] Every intended indexable content page appears in `src/app/sitemap.ts`.
- [ ] Utility, spam, test, preview, and private tool pages are excluded from the sitemap unless explicitly intended for search.
- [ ] Sitemap pages do not use `noindex`.
- [ ] Internal links point directly to canonical routes and do not depend on redirects.
- [ ] URLs emitted only in structured data (including breadcrumb `item` URLs) also resolve to canonical, indexable pages rather than 404s or avoidable redirects.
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

## Calculator-First Search Intent

- [ ] Lead calculator metadata and H1s with the question or outcome people search for; keep “calculator” as supporting language when the broader intent is answer-seeking.
- [ ] Apply the same answer-led language to location-page metadata, directory titles, structured-data names, navigation labels, and internal-link anchors so the intent is consistent across the whole cluster.
- [ ] Keep the calculator and its brief orientation in the first task area. Long-form SEO/GEO guidance belongs after the tool and must not delay the primary action.
- [ ] Give a specific result before asking for conversion: result first, calendar handoff second, OnTimer alarm handoff third.
- [ ] Remove repeated keyword sections that restate the same answer without adding a distinct decision, example, or planning factor.
- [ ] Explain where a planning answer can vary, identify what the traveler must verify, show the review date, and link to relevant primary sources without implying that a planning estimate is a guarantee.
- [ ] Measure the full answer funnel separately: calculator start, personalized answer generated, calendar handoff, post-calendar alarm CTA view, and App Store outbound click. Include intent cluster and location code where available.

## Search Snippet Candidates

- Keep the first visible passage after a calculator H1 focused on the personalized result, user inputs, and factors the calculator actually uses.
- Preserve useful rule-of-thumb guidance below the calculator. Use `data-nosnippet` only on a narrowly identified passage that is likely to replace the calculator value proposition in search results; do not suppress whole guidance or FAQ sections.
