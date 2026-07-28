# OnTimer Website Changelog

This changelog records meaningful website fixes, improvements, and maintenance outcomes. It complements Git history without duplicating implementation details. Brand strategy and positioning changes belong in BrandOS instead.

## Unreleased

- No unreleased changes.

## 2026-07-27

- Corrected cruise-terminal URLs that had been emitted under the airport route. Misclassified legacy URLs now permanently redirect to their canonical cruise pages.
- Restricted the airport calculator directory to airport destinations, preventing future airport/cruise route mismatches.
- Added missing canonical tags across indexable marketing pages, the blog, blog posts, and static legal pages.
- Added 11 eligible supporting content pages to the sitemap.
- Replaced internal links that unnecessarily passed through redirects with direct canonical links.
- Shortened privacy and terms redirects by sending them directly to the canonical `www` hostname.
- Added a repeatable production SEO audit and release checklist.
- Verified production with a complete crawl: 114 sitemap URLs, 115 discovered internal URLs, zero broken links, zero avoidable internal redirects, zero canonical issues, zero erroneous `noindex` pages, and zero destination-route mismatches.
