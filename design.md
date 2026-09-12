# Design — OnTimer Website

Locked design system for the OnTimer public website. Future page migrations read
this file first. Amend it intentionally when the system needs to grow.

## Genre

Modern-minimal with a calm, reassuring consumer voice. The experience should feel
precise and useful, never clinical, decorative, or productivity-generic.

## Page families

- Marketing pages: narrative workflow with outcome first, mechanism second, proof third.
- Tool pages: task-first workbench. Put the primary input and result before supporting content.
- Content pages: long-document reading pattern with answer-first introductions and restrained calls to action.
- Directory pages: searchable index with compact, descriptive destination links.
- Help and legal pages: quiet documentation pattern optimized for scanning and comprehension.

## Theme

`tokens.css` is canonical. Use light blue-tinted paper, dark navy ink, restrained
OnTimer blue, and green only for meaningful success. Accent color stays below five
percent of a viewport. Dark sections are allowed only when they improve hierarchy.

## Typography

- Display: the existing OnTimer display stack, weight 600–700, roman.
- Body: the existing OnTimer body stack, weight 400–600.
- Maximum prose measure: 65ch. Minimum comfortable measure: 45ch.
- Headings use tight but readable tracking and `overflow-wrap: anywhere`.

## Spacing and shape

- Use the named four-point scale in `tokens.css`.
- Buttons are pill-shaped. Inputs use the smaller input radius. Content cards use
  restrained rounding and borders, not floating dashboard tiles.
- Interactive controls have a 44px preferred target size and never wrap their labels.

## Motion

- Motion-cut by default. Use short color, opacity, or single-axis transform feedback.
- Focus indicators appear instantly.
- Every transform or animation has a reduced-motion fallback.

## CTA voice

- Primary: solid OnTimer blue, light text, concise action language.
- Secondary: dark ink text or a one-pixel outline on paper.
- App acquisition pages may use the App Store badge treatment.

## Accessibility and privacy

- WCAG 2.2 AA is a release requirement for every migrated route family.
- Preserve semantic headings, landmarks, labels, errors, keyboard behavior, zoom,
  touch targets, and high-contrast focus states.
- Cookie consent must work in forced regulated and unregulated states. Analytics and
  Travelpayouts remain blocked before consent where required. Analytics-free
  medication routes remain free of both analytics and consent UI.

## SEO and GEO invariants

- Do not change URLs, canonicals, metadata, structured data, hreflang, indexing,
  answer-first copy, or internal-link coverage as part of a visual migration.
- Keep meaningful content server-rendered and visible without interaction.
- Treat performance, heading order, and mobile usability as search requirements.

## Shared elements

Every public route shares the recognizable OnTimer header, footer, type, palette,
button voice, focus treatment, and spacing rhythm. Page families may vary their
layout because acquisition, calculation, reading, and medication scheduling are
different jobs.
