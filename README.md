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
│   │   ├── privacy/        # /privacy
│   │   ├── terms/          # /terms
│   │   ├── android/        # /android (waitlist)
│   │   ├── sitemap.ts      # Auto-generated sitemap.xml
│   │   ├── robots.ts       # Auto-generated robots.txt
│   │   └── feed.xml/       # RSS feed at /feed.xml
│   ├── components/
│   │   ├── Header.tsx      # Sticky nav header
│   │   ├── Footer.tsx      # Footer with links
│   │   └── CTAButton.tsx   # App Store + Android buttons
│   └── lib/
│       └── blog.ts         # Blog post utilities
```

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

## Updating the App Store URL

The App Store URL is defined in:

- `src/components/Header.tsx` — `APP_STORE_URL` constant
- `src/components/CTAButton.tsx` — `APP_STORE_URL` constant
- `src/components/Footer.tsx` — `APP_STORE_URL` constant

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

No environment variables are required. The site runs entirely statically with no external APIs.

### Custom Domain

In Vercel project settings, go to **Settings → Domains** and add your custom domain. Update the `metadataBase` URL in `src/app/layout.tsx` to match.

## SEO

- Metadata is configured in each page's `export const metadata`
- Root metadata (title template, OG tags, Twitter cards) is in `src/app/layout.tsx`
- `sitemap.xml` is auto-generated at `/sitemap.xml`
- `robots.txt` is auto-generated at `/robots.txt`
- RSS feed is available at `/feed.xml`

## License

All rights reserved. © OnTimer.
