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