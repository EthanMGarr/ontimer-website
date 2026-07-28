# OnTimer Website Changelog

This changelog records meaningful website fixes, improvements, and maintenance outcomes. It complements Git history without duplicating implementation details. Brand strategy and positioning changes belong in BrandOS instead.

## Unreleased

### 2026-07-28

- Hardened the Google Places and Routes proxy endpoints against unauthenticated direct use and request bursts with same-origin enforcement, input bounds, per-IP limits, and global per-instance safety limits.
- Reduced autocomplete request volume by requiring four characters, increasing debounce time to 600 ms, and cancelling stale browser requests.
- Removed paid travel-time retry fan-out so one calculator submission can make at most one upstream Routes API request; failures now use the existing manual-entry fallback.
- Bounded the warm-instance travel cache and corrected documentation that had incorrectly described it as cross-instance caching.
- Added automated API cost-guard tests and a permanent paid-API cost-safety checklist.
- Verification: API cost-guard, autocomplete, and leave-time tests passed; the optimized production build passed.

## 2026-07-27

- Corrected cruise-terminal URLs that had been emitted under the airport route. Misclassified legacy URLs now permanently redirect to their canonical cruise pages.
- Restricted the airport calculator directory to airport destinations, preventing future airport/cruise route mismatches.
- Added missing canonical tags across indexable marketing pages, the blog, blog posts, and static legal pages.
- Added 11 eligible supporting content pages to the sitemap.
- Replaced internal links that unnecessarily passed through redirects with direct canonical links.
- Shortened privacy and terms redirects by sending them directly to the canonical `www` hostname.
- Added a repeatable production SEO audit and release checklist.
- Verified production with a complete crawl: 114 sitemap URLs, 115 discovered internal URLs, zero broken links, zero avoidable internal redirects, zero canonical issues, zero erroneous `noindex` pages, and zero destination-route mismatches.
