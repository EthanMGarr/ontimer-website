# OnTimer Website

Marketing website for the [OnTimer iOS app](https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601) — built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Blog:** Markdown files with gray-matter + marked
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start the production server locally

```bash
npm start
```

## Project Structure

```
ontimer-website/
├── content/
│   └── blog/               # Markdown blog posts
│       ├── stop-being-late-to-meetings.md
│       └── calendar-reminders-vs-alarms.md
├── public/
│   └── images/             # App screenshots (used throughout)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout (Header + Footer)
│   │   ├── page.tsx        # Home page
│   │   ├── features/       # /features
│   │   ├── how-it-works/   # /how-it-works
│   │   ├── faq/            # /faq
│   │   ├── blog/           # /blog and /blog/[slug]
│   │   ├── privacy/        # unreachable — /privacy redirects to public/OnTimer_Privacy_Policy.html
│   │   ├── terms/          # unreachable — /terms redirects to public/OnTimer_Terms_of_Service.html
│   │   ├── android/        # /android (waitlist)
│   │   ├── sitemap.ts      # Auto-generated sitemap.xml
│   │   └── feed.xml/       # RSS feed at /feed.xml
│   ├── components/
│   │   ├── Header.tsx              # Sticky nav header
│   │   ├── Footer.tsx              # Footer with links
│   │   ├── CTAButton.tsx           # App Store + Android buttons
│   │   ├── GoogleAnalytics.tsx     # GA4, gated by cookie consent (see below)
│   │   └── CookieConsentBanner.tsx # EU/UK/EEA/CH consent banner
│   ├── middleware.ts       # Geo-classifies visitors for the consent gate
│   └── lib/
│       ├── blog.ts         # Blog post utilities
│       └── consent.ts      # Cookie consent state helpers
```

**Privacy policy / terms of service:** the actual documents served to visitors are static files, `public/OnTimer_Privacy_Policy.html` and `public/OnTimer_Terms_of_Service.html` — `next.config.js` redirects `/privacy` and `/terms` to them, and the Footer links there directly. The Next.js pages under `src/app/privacy/` and `src/app/terms/` are unused legacy duplicates; edit the static HTML files for any policy change.

**Cookie consent:** Google Analytics only loads immediately for visitors outside the EU/EEA/UK/Switzerland. Regulated visitors see a consent banner first (`src/middleware.ts` classifies by IP country, `src/components/CookieConsentBanner.tsx` renders the banner, `src/lib/consent.ts` holds the shared state helpers).

## Adding Blog Posts

Create a new `.md` file in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-03-01"
description: "A short description for the blog listing and SEO meta tags."
---

Your post content in Markdown...
```

The filename (without `.md`) becomes the URL slug. For example, `my-new-post.md` is served at `/blog/my-new-post`.

Blog posts are automatically included in the sitemap and RSS feed.

## App Store CTAs

All install CTAs must use the shared CTA components in `src/components/CTAButton.tsx` or `src/components/AppStoreCTA.tsx`. They provide direct App Store links on mobile and a QR-code handoff on desktop. Do not add hard-coded App Store links to individual pages.

Update the canonical App Store URL in the shared CTA implementation rather than in individual pages.

## Medication Schedule Generator

The medication tool exports one recurring `.ics` event per daily dose time. Each series begins at its next future occurrence in the selected timezone, preserves overnight offsets and duration, and includes an at-time calendar alert.

Opening an `.ics` file is not proof that the event was saved. Keep the **Add to Calendar** CTA and the iPhone instruction to complete Apple's **Add To Calendar** confirmation. Never expose the full IANA timezone catalog; use the compact maintained list in `MedicationScheduleGenerator.tsx`.

Before shipping generator or ICS changes, run:

```bash
npm run test:medication-schedule
npm run build
```

## Deploying to Vercel

### Option 1: Deploy from GitHub (recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — no configuration needed
6. Click **"Deploy"**

Your site will be live in ~60 seconds. Future pushes to `main` deploy automatically.

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

The core marketing pages build without external credentials. Production integrations use these variables when their related features are enabled:

- `GOOGLE_MAPS_API_KEY` — places autocomplete and travel-time APIs
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — spam-report Turnstile widget
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` — server-side spam reporting

Store local values in `.env.local`; never commit secrets.

### Custom Domain

In Vercel project settings, go to **Settings → Domains** and add your custom domain. Update the `metadataBase` URL in `src/app/layout.tsx` to match.

## SEO

- Metadata is configured in each page's `export const metadata`
- Root metadata (title template, OG tags, Twitter cards) is in `src/app/layout.tsx`
- `sitemap.xml` is auto-generated at `/sitemap.xml`
- `robots.txt` is served from `public/robots.txt`
- RSS feed is available at `/feed.xml`
- Run `npm run audit:site` after production SEO, route, metadata, sitemap, canonical, or internal-link changes
- Use `docs/SEO_CHECKLIST.md` for the release checklist
- Use `docs/API_COST_CHECKLIST.md` whenever adding or changing a paid API integration

## Change Tracking

- Record meaningful website fixes and improvements in `docs/SITE_CHANGELOG.md` under `Unreleased`.
- Update permanent guidance and checklists when a change establishes a reusable rule.
- BrandOS records durable strategy and positioning changes, not routine implementation history.

## License

All rights reserved. © OnTimer.
