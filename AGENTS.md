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

## Permanent Local Preview Workflow

- Use `npm run preview:start` for user-review previews. It owns port 3010, records the exact process, and does not report success until `/what-time-should-i-leave` returns healthy rendered HTML.
- Use `npm run preview:status` to diagnose the review server and `npm run preview:stop` before intentionally replacing it. Do not leave an ad hoc `next dev -p 3010` process running.
- Development output belongs in `.next-dev`; production builds belong in `.next`. Never remove this isolation or configure development and `next build` to write to the same directory.
- A local preview is not ready for handoff until its route-level health check passes. A listening port alone is insufficient.

## Permanent Deployment Workflow

- From the repository root, run `npm run vercel:check` before a release and `npm run deploy:prod` to publish production.
- These scripts invoke the exact Vercel CLI pinned in `package.json` by repository path, verify `.vercel/project.json` matches the OnTimer production target, and verify the saved login before any upload.
- Never use `npx vercel@latest`, `npx -y vercel@latest`, a global `vercel`, or a newly downloaded CLI for this repository. Do not fall back to one if a release command fails.
- If dependencies are missing or the pinned version does not match, run `npm ci`. If the project link is missing, run `npm run vercel:link`. If the saved login is actually invalid, run `npm run vercel:login`.
- Treat `.vercel/project.json` as project-link metadata, not authentication. A successful local `whoami` check is the authentication test.
- After publishing, wait for Vercel to report `Ready` and verify the changed behavior on the canonical production URL before reporting completion.

## Change Tracking

Treat documentation and regression prevention as part of every completed change.

- Record every user-facing improvement, bug fix, SEO change, routing change, deployment correction, and meaningful maintenance change in `docs/SITE_CHANGELOG.md` under `Unreleased`.
- Include the date, a concise description of the outcome, and the verification performed. Do not duplicate raw Git history or implementation minutiae.
- Update the relevant permanent checklist or repository guidance whenever a change establishes a reusable rule or reveals a new regression risk.
- For SEO, indexing, metadata, sitemap, redirect, canonical, or internal-link work, update `docs/SEO_CHECKLIST.md` when the operating procedure changes and run `npm run audit:site` after deployment.
- For paid API additions or changes, follow `docs/API_COST_CHECKLIST.md`, add regression coverage for request guards, and verify provider-side quotas and billing by service/SKU after deployment.
- Keep `README.md` and `CLAUDE.md` accurate when architecture, setup, deployment, environment variables, or permanent working rules change.
- Do not put routine implementation changes in BrandOS. BrandOS changelogs and decision logs are reserved for durable strategy or positioning changes.
- Before finishing, confirm that the changelog/checklist update is included in the same commit as the related work whenever practical.
