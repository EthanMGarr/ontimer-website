# AGENTS.md

This repository uses BrandOS as its strategic source of truth.

Before performing any work involving product, marketing, UX, copy, ASO, website content, positioning, pricing, onboarding, or messaging:

Read:

1. BrandOS/Constitution.md
2. BrandOS/Positioning.md
3. BrandOS/Customer.md
4. BrandOS/Vocabulary.md
5. BrandOS/Decision_Log.md
6. BrandOS/Current_Campaign.md (if present)

These documents define the current brand strategy.

Do not silently contradict BrandOS.

If you believe BrandOS should change based on new evidence, explain why and recommend updating BrandOS before changing downstream assets.

For implementation-only tasks (bug fixes, refactoring, infrastructure), BrandOS usually does not need to be consulted.

## Change Tracking

Treat documentation and regression prevention as part of every completed change.

- Record every user-facing improvement, bug fix, SEO change, routing change, deployment correction, and meaningful maintenance change in `docs/SITE_CHANGELOG.md` under `Unreleased`.
- Include the date, a concise description of the outcome, and the verification performed. Do not duplicate raw Git history or implementation minutiae.
- Update the relevant permanent checklist or repository guidance whenever a change establishes a reusable rule or reveals a new regression risk.
- For SEO, indexing, metadata, sitemap, redirect, canonical, or internal-link work, update `docs/SEO_CHECKLIST.md` when the operating procedure changes and run `npm run audit:site` after deployment.
- Keep `README.md` and `CLAUDE.md` accurate when architecture, setup, deployment, environment variables, or permanent working rules change.
- Do not put routine implementation changes in BrandOS. BrandOS changelogs and decision logs are reserved for durable strategy or positioning changes.
- Before finishing, confirm that the changelog/checklist update is included in the same commit as the related work whenever practical.
