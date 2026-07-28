This repository is the marketing website for the OnTimer iOS app.

Goal:
Drive App Store downloads.

Tech stack:
Next.js
TypeScript
Tailwind CSS
Deploy on Vercel

Design:
Dark theme
Green accent color
Bold typography
Use screenshots from /public/images

Primary CTA:
Download on the App Store

Secondary CTA:
Android waitlist

Pages required:
/
features
how-it-works
faq
blog
privacy
terms
android waitlist

SEO requirements:
metadata
sitemap
robots
OpenGraph
Twitter cards

Permanent SEO invariants:
- Every indexable HTML page has a self-referencing canonical URL.
- Every intended indexable content page is included in `src/app/sitemap.ts`.
- Sitemap URLs return 200 and are not marked `noindex`.
- Internal links point directly to canonical URLs rather than through redirects.
- Airport and cruise-terminal destinations use their correct route families.
- Run `npm run audit:site` after production deploys that affect routes, metadata, canonicals, sitemaps, or internal links.

Do not introduce paid services or unnecessary complexity.

---

## Product Positioning

OnTimer is an iOS alarm app that fires a high-salience alarm before calendar events so users are never late.

It is NOT a calendar app, task manager, reminder app, or productivity suite.

Core differentiator:
Calendar reminders require no action — users see them and still leave late.
OnTimer fires a real alarm (sound + haptics + full-screen) that demands acknowledgement.

Core user problem:
Notification blindness. People aren't late because they forget meetings — they're late because passive reminders are too easy to ignore.

Tagline: "Early is OnTime — and OnTime is Late."

---

## UX Philosophy

Trust-first — show real, specific behavior. Never make aspirational claims without grounding them.
No fake personalization, fake counters, or AI-generated-sounding copy.
No clutter — every element either explains the product or drives toward download.
Mobile-first clarity — the primary message and CTA must be visible without scrolling.
Specificity builds credibility: "5 minutes before your meeting" beats "never be late again."
Avoid corporate marketing language. Write like a person explaining a tool they actually use.

---

## Conversion Philosophy

Users arrive skeptical. Pages should build understanding in this sequence:
  1. What it does — specific, concrete, immediate
  2. Why it works better than the thing they already use (calendar reminders)
  3. Proof or specifics that validate the claim
  4. Download CTA

Never ask for install before the core value is clear.
Trust is built before action is requested — not after.

---

## App Store CTA Behavior (permanent rule)

Desktop and mobile users need different install flows. Sending a desktop user to the App Store
web listing is a dead end — they cannot install from there and must transfer to their phone
on their own, which most won't do.

Rules that apply to every App Store button and CTA on every page:

- **Mobile (touch devices):** link directly to the App Store URL
  (https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601).
  The user is already on the device where they can install.
- **Desktop:** do NOT link to the App Store listing. Show a QR code the user can
  scan to open the App Store on their phone. This is the only reliable desktop→mobile
  handoff. A popover or inline modal works; a new tab to the App Store does not.

Implementation contract:
- All App Store CTAs must go through a single shared component (currently `CTAButton.tsx`
  and `AppStoreCTA.tsx`) that enforces this logic centrally.
- Never hard-code an App Store `<a href>` directly in a page or section component —
  it bypasses the device-aware logic and will silently break the desktop flow.
- When adding a new CTA placement, use the existing shared component with a `location`
  prop for analytics. Do not create one-off button implementations.
- The QR code popover must be keyboard-accessible and dismissible.

---

## SEO / GEO / AEO Guidance

Direct answers belong near the top of each section, not buried in paragraphs.
Headings must be strong and descriptive — AI models and search engines index these directly.
Write each section so it can be read and understood independently (enables featured snippets and AI citations).
FAQ page: answer questions using the exact phrasing a user would type or speak.
Avoid filler sentences and vague claims — they dilute signal and reduce credibility.
Internal link path: home → features → how-it-works → download.
Avoid thin content pages. Every page should answer one clear, specific question.

---

## Mobile-First Rules

Above the fold must include: app name, one-line value prop, App Store button — all visible at 375px.
Primary CTA must appear before the fold on mobile. Never push it below hero content.
Do not stack multiple paragraphs before a visual break or CTA.
Use responsive spacing — compress vertical padding on small viewports.
Test all new sections at 375px width before considering them done.

---

## Safe Working Rules

Never reduce above-the-fold clarity for any reason.
Never add fake personalization, fabricated testimonials, or invented social proof.
Never introduce a new dependency or external service without a clear functional reason.
Never weaken or visually subordinate the primary CTA.
Never use SEO spam tactics: no keyword stuffing, invisible text, or low-quality link schemes.
Never write copy that sounds generic or AI-generated — be specific and honest.
Prefer simple, maintainable implementations. Clever is expensive to maintain.
When in doubt between two approaches, pick the one that is easier to read and modify six months from now.

---

## Change-Logging Rule

Every meaningful website fix, improvement, user-facing change, SEO correction, routing change, or maintenance change must be recorded in `docs/SITE_CHANGELOG.md` under `Unreleased`.

When a change creates a durable working rule or a repeatable regression check, also update the relevant checklist or repository guidance. Use `docs/SEO_CHECKLIST.md` for search/indexing work. Keep routine implementation history out of BrandOS unless the change alters durable brand strategy or positioning.

Before considering work complete:

1. Verify the change in proportion to risk.
2. Update `docs/SITE_CHANGELOG.md`.
3. Update any affected checklist, README, or permanent rule.
4. Include those documentation updates in the same commit whenever practical.
