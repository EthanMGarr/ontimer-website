# OnTimer Homepage Redesign Specification v1.0

Status: Approved Design Specification

This document is the source of truth for the OnTimer homepage redesign.

It defines the intended experience, hierarchy, conversion strategy, and design guardrails for the homepage. Future homepage changes should be evaluated against this document before they are designed or implemented.

This is not an engineering implementation plan. It is the product design specification that engineering, design, marketing, product, and future AI assistants should use before changing the homepage.

## North Star

The OnTimer homepage should feel like a premium iPhone app landing page, not an SEO article.

Within five seconds, visitors should understand the promise: OnTimer helps them stay on time automatically.

Within fifteen seconds, visitors should trust the mechanism: OnTimer turns existing calendar events into persistent alarms, with Google Calendar, Apple Calendar, Microsoft calendars, Time To Leave, and multiple-calendar support.

The page should make installation feel obvious, low-friction, and worthwhile. On mobile, that means a direct App Store path. On desktop, that means a confident QR scan path.

SEO should become nearly invisible to humans while remaining structurally excellent for search engines and LLMs. Humans should experience clarity. Search engines should experience semantic completeness.

Success feels like this:

- The page is calm, specific, and product-led.
- The hero is understood without effort.
- The product feels credible before it feels feature-rich.
- The primary CTA is never in competition with secondary paths.
- Educational and calculator content remain discoverable without dominating the page.
- The homepage helps people want OnTimer, not merely understand the OnTimer content library.

## Design Philosophy

### One Page. One Purpose.

The homepage exists to get qualified iPhone visitors to install OnTimer.

Everything on the page should either increase desire, reduce doubt, or support discovery without distracting from installation. If a section cannot explain how it moves a visitor closer to trust or installation, it does not belong on the homepage.

### Outcome Before Mechanism

Lead with the customer's desired state: never be late again.

The mechanism, automatic calendar alarms, comes after the outcome is understood. Proof comes after that. This order should govern copy, layout, visual hierarchy, screenshots, navigation, and section order.

The homepage should not begin by asking visitors to understand a category. It should begin by making them feel recognized.

### Every Section Has Exactly One Job

A section may convert, reassure, educate, prove, or route. It should not try to do all of those things at once.

The current homepage became cluttered because sections gradually accumulated multiple jobs: SEO, FAQ, conversion, education, feature proof, and internal linking. The redesign must reverse that pattern.

### Reduce Cognitive Load Relentlessly

The visitor should never have to parse five equal options, read a dense paragraph before understanding the product, or decide whether the homepage is about the app, calculators, medication guides, Android, flights, meetings, or SEO articles.

The page should answer one question at a time:

1. What is this?
2. Why should I care?
3. How does it work?
4. Can I trust it?
5. What should I do next?

### Never Compete With The Primary CTA

The homepage can contain multiple paths, but only one primary action at a time.

On mobile, the primary action is downloading from the App Store. On desktop, the primary action is scanning the QR code with an iPhone. Android waitlist, calculator links, blog links, FAQ links, and educational guides are secondary.

### SEO Should Support The Experience

SEO, GEO, and AEO should be preserved through structure:

- semantic headings
- concise direct-answer content
- schema
- internal links
- clean navigation
- calculator discoverability
- precise product language

They should not dominate the visible experience. The visitor should not feel like the hero is a search snippet.

### Progressive Disclosure Over Information Overload

The homepage should reveal depth in the order a visitor needs it. Do not explain every feature before the visitor believes the promise. Do not present calculators before the visitor understands the product. Do not show FAQ content before the main story is clear.

### Mobile First, Desktop Exceptional

Mobile is the primary surface. The mobile homepage should be fast to understand, easy to act on, and comfortable to scroll with one hand.

Desktop should not be a stretched mobile page. Desktop should use space for larger product proof, confident breathing room, and QR-led conversion.

### Show Instead Of Explain

The strongest homepage proof is not another paragraph saying that alarms are persistent. It is a product visual that makes persistence obvious.

The hero screenshot must prove the product faster than copy can explain it.

## Success Metrics

The redesign succeeds if it improves the homepage as both a product surface and a search-visible entity.

Primary conversion metrics:

- Increase hero App Store click-through rate on mobile.
- Increase desktop QR scans or QR interactions.
- Increase total homepage-to-App-Store intent events.
- Increase downstream install conversion where measurable.
- Reduce first-screen abandonment.

Product comprehension metrics:

- In user testing, visitors can explain what OnTimer does within five seconds.
- In user testing, visitors can explain how OnTimer differs from a normal calendar notification within fifteen seconds.
- In session analysis, visitors reach product proof sections without excessive early exits.

SEO, GEO, and AEO metrics:

- Maintain or improve homepage organic visibility.
- Preserve valid SoftwareApplication, WebSite, Organization, and FAQ structured data.
- Preserve clear entity recognition for OnTimer, iPhone, calendar alarm app, Google Calendar, Apple Calendar, Microsoft calendars, persistent alarms, Time To Leave, and multiple calendars.
- Preserve internal links to calculator and authority pages.

Quality metrics:

- Preserve or improve Core Web Vitals.
- Maintain WCAG AA accessibility.
- Avoid layout shift from screenshots, QR components, or client-side CTA behavior.
- Maintain legal and App Store compliance references.

## Non-Goals

The homepage is not the primary calculator experience.

The homepage is not the primary educational resource.

The homepage is not trying to explain every feature.

The homepage is not trying to rank for every keyword.

The homepage is not a directory of every guide, calculator, or use case.

The homepage is not documentation.

The homepage is not the place to validate every edge case, integration detail, pricing nuance, or support scenario.

The homepage is not a general productivity landing page.

The homepage is not an ADHD, medication, travel, or meeting-only page. Those use cases can appear only when they support the broader promise: OnTimer helps people stay on time from their existing calendar.

## Homepage Guardrails

These rules are permanent unless BrandOS or this specification is intentionally revised.

- Never introduce multiple competing primary CTAs.
- Never place SEO-first content above the core product narrative.
- Never allow the hero to become text-heavy.
- Never add promotional banners above the fold.
- Never allow the homepage to become a calculator directory.
- Never embed a homepage calculator without revisiting this specification.
- Never introduce an additional hero screenshot without removing or demoting another visual.
- Never lead with generic productivity language.
- Never lead with mechanism before outcome.
- Never bury the App Store or QR path behind secondary choices.
- Never treat Android waitlist as equal priority to iPhone install.
- Never duplicate explanations in multiple homepage sections.
- Never add a homepage element without documenting why it belongs there, why it belongs in that position, and what would be removed if attention becomes crowded.
- Never allow SEO content to make the page feel less premium to humans.

## Above-The-Fold Budget

Attention is a limited resource. The first viewport has a strict budget.

Maximum above the fold:

- one H1
- one supporting paragraph
- one primary CTA system
- one secondary CTA or secondary text link
- one hero screenshot or product visual
- one proof row
- one compact compatibility line

Anything added above the fold requires removing or demoting something else.

Do not add:

- FAQ cards
- Direct Answer cards
- calculator forms
- promotional banners
- blog links
- medication guide links
- long feature lists
- multiple equal screenshots
- multiple equal CTAs
- dense SEO paragraphs

## Visitor Journey

### Second 0-3: Recognition

The visitor notices the brand, the headline, and the product visual.

The intended thought is: "This is about my lateness problem."

The hero should not ask them to understand the category before they understand the outcome. The page should open with the customer-facing promise:

> Never be late again.

The supporting line should immediately connect that promise to the mechanism:

> OnTimer automatically turns your calendar events into alarms, so you know when to join, leave, or act before the moment passes.

### Second 3-8: Relevance

The visitor asks: "Is this for me?"

The page answers with familiar proof:

- Google Calendar
- Apple Calendar
- Microsoft calendars
- persistent alarms
- Time To Leave
- multiple calendars
- iPhone

This proof should be scannable. It should not become a paragraph.

### Second 8-15: Credibility

The visitor asks: "How is this different from normal calendar reminders?"

The page must show the behavioral distinction:

- notifications inform and disappear
- OnTimer alarms interrupt and require acknowledgement

This is where product proof matters more than explanation.

### Before Download

Before clicking download, the visitor should feel relief, not pressure.

The ideal emotional state is:

> This is specific. This is credible. This seems easy enough to try.

The page should already have removed these objections:

- "Do I need to rebuild my calendar?" No.
- "Does it work with the calendars I use?" Google Calendar, Apple Calendar, and Microsoft calendars.
- "Is this just another notification?" No, it is a persistent alarm.
- "Is this for iPhone?" Yes.
- "Will it help me act before the moment passes?" That is the core product behavior.

Some uncertainty can remain after the homepage:

- exact settings
- full pricing detail
- all edge cases
- support details
- Android timing

Those do not need to be resolved in the hero.

## Experience Arc

The homepage should move through this progression:

1. Promise: never be late again.
2. Mechanism: automatic calendar alarms from the existing calendar.
3. Proof: Google Calendar, Apple Calendar, Microsoft calendars, persistent alarms, Time To Leave, multiple calendars.
4. Product demonstration: connect once, alarms prepare automatically, alarm interrupts.
5. Behavioral insight: the problem is not remembering; it is acting in time.
6. Differentiation: notifications inform; OnTimer alarms demand a response.
7. Discovery: calculators, guides, FAQ, and deeper education exist for visitors who need them.
8. Conversion: install on iPhone.

## Hero Section

The hero is the most important part of the homepage. It should be quiet, direct, and unmistakably product-led.

### Hero Message

Recommended H1:

> Never be late again.

Recommended support:

> OnTimer automatically turns your calendar events into alarms, so you know when to join, leave, or act before the moment passes.

Recommended proof language near the CTA:

> Works with all of your Google, Apple Calendar, and Microsoft Calendars.

Recommended proof row:

- Persistent alarms
- Time To Leave
- Multiple calendars

### Visual Hierarchy

The expected eye path should be:

1. OnTimer brand and navigation
2. H1
3. hero screenshot
4. supporting paragraph
5. primary CTA
6. proof row

The hero should not feel like a wall of explanation. It should feel like a confident app launch page.

### Information Density

The hero should be readable in one glance and understood in one breath.

Maximum hero copy:

- one short headline
- one short paragraph
- one compatibility line
- one proof row
- one primary CTA system
- one secondary text link if needed

### Whitespace

Whitespace should communicate confidence. The page should not try to prove seriousness by filling every inch.

The hero should have enough breathing room that the CTA and screenshot feel deliberate. On desktop, the hero should feel spacious. On mobile, it should feel concise.

### Desktop Behavior

Desktop should prioritize QR scanning.

The QR module should be visible in the hero without requiring a click. Desktop visitors are often viewing the site on a non-iPhone device, so the cleanest conversion path is scanning with their iPhone camera.

Do not automatically preserve a visible "Open in App Store" button in the desktop hero. From first principles, it can hurt conversion by creating an inferior path:

- It sends desktop users to a web App Store listing they may not be able to act on immediately.
- It competes visually with the QR code.
- It splits attention at the exact moment the page should make one action feel obvious.

Recommendation: the desktop hero should make QR the dominant CTA. If an App Store text link remains, it should be visually secondary and utilitarian, such as "Open App Store listing" beneath the QR support copy. It should not look like a second primary button.

### Mobile Behavior

Mobile should prioritize direct App Store installation.

The CTA should be visible above the fold on common iPhone viewport heights. The hero screenshot must not push the primary button below a comfortable first-screen scan.

Recommended mobile order:

1. H1
2. support paragraph
3. App Store CTA
4. compatibility line
5. compact product visual
6. proof row or proof chips

If the screenshot creates too much vertical pressure, show a cropped or reduced version on mobile and let the full proof appear in the next section.

### Tablet Behavior

Tablet sits between the two modes.

If the device is likely touch-first, preserve App Store button priority. If the layout behaves like desktop, QR can appear, but it should not displace the main product message.

### What Must Not Appear In The Hero

- Direct Answer card
- FAQ cards
- calculator module
- long feature list
- popular guides
- medication guide links
- Android waitlist as an equal CTA
- multiple competing screenshots
- SEO paragraphs
- promotional banners

## Screenshot Strategy

The hero screenshot is the single most important visual asset on the homepage.

It should communicate, without requiring users to read copy:

- iPhone app
- calendar event
- persistent alarm
- urgency
- acknowledgement required
- confidence

If the screenshot cannot communicate those things, the screenshot should be redesigned before launch.

### The One Screen That Matters Most

The best hero screen is the persistent alarm state.

It is the clearest product proof because it shows what makes OnTimer different from a calendar notification. Setup screens, calendar lists, and generic marketing screens can help later, but they do not communicate the core differentiation as quickly.

The hero visual should make the visitor feel:

> This is not another reminder. This will actually interrupt me when I need to move.

### Screenshot Count

Use no more than three product screenshots across the main homepage story:

1. Hero: persistent alarm state.
2. Mechanism section: calendar connection or automatically prepared event alarm.
3. Time To Leave section: location-based leave-time alert.

Do not place all screenshots together. Each screenshot should answer the question the visitor has at that moment.

### Desktop Screenshot Use

Desktop can support a larger hero device visual and a smaller companion detail only if the second visual reinforces the same story. Do not create a screenshot collage that forces comparison.

### Mobile Screenshot Use

Mobile should show one screenshot per moment. The screenshot should be large enough to read but not so large that it delays the CTA or forces excessive scrolling.

### Screenshot Purpose

Screenshots should prove, not decorate.

Every screenshot must have a specific job:

- prove persistence
- prove automation
- prove Time To Leave
- prove calendar connection

If a screenshot is only there to make the page look more visual, remove it.

## Visual Design System

The homepage should feel premium, calm, and exact.

It should borrow principles from Apple, Linear, Arc, and Stripe without copying their visual skin.

From Apple: restraint, product primacy, and confidence through simplicity.

From Linear: crisp hierarchy, serious utility, and dense meaning without clutter.

From Arc: opinionated category framing and a product story that feels distinct.

From Stripe: trust through structure, strong information architecture, and polished details.

### Emotional Tone

The emotional tone should be reassuring, not motivational.

OnTimer should not sound like a productivity coach. It should feel like a dependable system that quietly protects an important moment.

The page should feel:

- confident
- focused
- precise
- modern
- calm
- product-led
- trustworthy

It should not feel:

- busy
- shouty
- generic
- blog-like
- directory-like
- overly playful
- overly technical

### Rhythm And Pacing

The page should alternate between conviction and explanation.

Recommended pacing:

1. Short promise
2. Short proof
3. Simple mechanism
4. Visual proof
5. Conceptual insight
6. Use cases
7. Discovery
8. FAQ
9. Final CTA

Do not stack multiple dense text sections back to back. Give users moments of visual rest.

### Whitespace And Breathing Room

Whitespace should be treated as a trust signal. A premium product does not need to fill every surface to prove value.

Use generous section spacing on desktop. Use tighter but still calm spacing on mobile. The goal is a page that feels composed, not sparse.

### Typography Philosophy

Typography should be strong but restrained.

The H1 can be large because it carries the page promise. Section headings should be smaller and more precise. Card headings should be compact. Avoid making every heading feel like a hero.

Do not use viewport-based font scaling. Use deliberate responsive breakpoints and ensure text fits cleanly inside containers.

### Cards And Surfaces

Use fewer cards than the current homepage.

Cards should be reserved for discrete objects:

- FAQ items
- calculator links
- comparison rows
- specific proof items

Do not place broad page sections inside decorative cards. Do not nest cards inside cards. Do not make the homepage feel like a dashboard.

### Gradients And Backgrounds

Gradients may be used as subtle atmosphere, not as the design concept.

The page should not rely on green glows or background effects to feel premium. Product proof, hierarchy, and restraint should carry the design.

### Motion

Motion should be minimal and functional.

Appropriate motion:

- gentle QR reveal
- dropdown transitions
- subtle product screenshot entrance
- reduced movement for users who prefer reduced motion

Avoid motion that distracts from reading or makes the page feel promotional.

## Cognitive Load Strategy

The current homepage asks visitors to process too many categories early:

- persistent alarms
- Direct Answer
- Android
- logos
- screenshots
- meetings
- flights
- medication
- Last 5 Minutes Problem
- FAQ
- guides
- calculators

This creates decision fatigue and weakens the product story.

The redesign should reduce early choices to:

1. Understand the promise.
2. See the product proof.
3. Install or continue.

### Hick's Law

The hero should not present App Store, Android waitlist, calculator, blog, FAQ, and guide paths with similar weight. More choices slow action.

### Progressive Disclosure

Visitors should not encounter calculator discovery, educational links, or FAQ until after the product story is clear.

### Reading Load

Most homepage paragraphs should be short. The page can contain depth, but it should be revealed in small, purposeful sections.

## CTA Strategy

### CTA Philosophy

There should be one primary CTA system, repeated only at natural decision points.

Recommended CTA moments:

1. Header: persistent but visually modest.
2. Hero: dominant.
3. Final section: decisive repeat.

Avoid placing CTAs after every section. Repetition should feel helpful, not anxious.

### Mobile CTA

Mobile primary CTA:

> Download on the App Store

This should be the dominant action and should appear above the fold.

Android waitlist may appear as a small secondary text link:

> Android? Join the waitlist.

Do not render Android as an equal button beside the App Store CTA in the mobile hero.

### Desktop CTA

Desktop primary CTA:

> Scan to install OnTimer

The QR code should be visible in the hero. The CTA should teach the behavior directly: open the iPhone camera and scan.

Recommendation: do not show a visible equal-weight App Store button in the desktop hero. If retained, the App Store listing link should be secondary and text-like, not a primary button.

Reason: the homepage should make the best desktop conversion path unmistakable. A visible App Store button can look familiar, but it may route desktop users into a less actionable web listing and reduce QR attention.

### Header CTA

The header CTA can remain compact. On desktop, it may open a QR popover. On mobile, it should link directly to the App Store.

### Final CTA

The final CTA should return to the promise, not introduce new information.

Example:

> Stay on time automatically.
> Download OnTimer for iPhone.

## Navigation Strategy

The navigation should scale for the next several years.

Current navigation underserves the calculator ecosystem because a single `Airport Calculator` link implies one tool rather than a growing set of timing calculators.

Recommended IA:

- Product
- Calculators
- Learn
- FAQ
- Download

### Product

Includes:

- Features
- How It Works

This supports visitors who want to understand the app.

### Calculators

Includes:

- Airport Time To Leave
- What Time Should I Leave
- Wake-Up Time
- Airport Theory
- future calculator categories such as Cruise

This creates a scalable home for tool intent without making the homepage itself a tool.

### Learn

Includes:

- Why Calendar Notifications Fail
- Last 5 Minutes Problem
- Calendar Notifications vs Alarms
- Blog

This preserves information scent for educational visitors while keeping the main nav clean.

### FAQ

FAQ should remain visible because it is a common trust path and supports AEO.

### Download

Download should be visually distinct but not loud. On desktop, it should support QR. On mobile, it should go directly to the App Store.

### Information Scent

Every nav label should answer: "What happens if I click this?"

`Calculators` is clearer and more scalable than `Airport Calculator`.

`Learn` is clearer than exposing many individual guide links.

`Product` is clearer than forcing `Features` and `How It Works` to compete as top-level concepts if nav space becomes tight.

## Calculator Strategy

### Homepage With Embedded Calculator

Advantages:

- immediate utility
- shows Time To Leave relevance
- may engage visitors with tool intent

Costs:

- turns the homepage into a task page
- adds form friction before trust
- competes with install conversion
- pushes product proof down on mobile
- creates a precedent for adding more tools above the product story
- weakens the premium app-landing-page feel
- makes future calculator expansion harder to govern

### Homepage Without Embedded Calculator

Advantages:

- preserves one purpose: install
- keeps calculator pages as dedicated organic landing pages
- lets each calculator satisfy its own search intent
- makes the homepage more premium and product-led
- scales better as calculator families expand
- supports internal linking without disrupting the product story

Costs:

- tool-seeking visitors need one extra click
- homepage becomes less interactive
- calculator value must be communicated through links and short proof sections

### Recommendation

Do not embed a calculator on the homepage.

Use navigation and a lower-page calculator discovery section to route visitors into calculator experiences. The homepage should explain why OnTimer helps people act on time. Dedicated calculator pages should perform calculations.

## Information Architecture

### Recommended Section Order

1. Hero
2. Proof strip
3. How OnTimer works
4. Alarm proof
5. Why reminders fail
6. Use cases
7. Time To Leave
8. Comparison
9. Calculator discovery
10. Direct Answer and FAQ
11. Final CTA

### Hero

Human job: create recognition and desire.

SEO job: provide clear H1 and product entity language.

GEO job: establish OnTimer as an iPhone calendar alarm app.

Conversion job: drive App Store download or QR scan.

Reason it appears here: the first viewport must answer why the visitor should care.

If removed: the page loses its conversion center.

What users should remember: OnTimer keeps me on time automatically.

### Proof Strip

Human job: remove compatibility doubt.

SEO job: reinforce Google Calendar, Apple Calendar, Microsoft calendars, persistent alarms, Time To Leave, and multiple calendars.

GEO job: make product proof extractable.

Conversion job: make install feel lower-risk.

Reason it appears here: proof belongs immediately after the promise.

If removed: the hero claim feels less grounded.

What users should remember: OnTimer works with my calendar and has real alarm behavior.

### How OnTimer Works

Human job: make the mechanism feel simple.

SEO job: support "turn calendar events into alarms."

GEO job: clarify the process.

Conversion job: reduce setup anxiety.

Reason it appears here: after desire, visitors need feasibility.

If removed: "automatic" may feel vague.

What users should remember: I connect once; alarms happen automatically.

### Alarm Proof

Human job: show the product's core difference.

SEO job: naturally reinforce persistent alarm language.

GEO job: connect product behavior to category.

Conversion job: build trust through evidence.

Reason it appears here: users now need to believe this is not a normal reminder.

If removed: the page becomes claim-heavy.

What users should remember: this is an alarm, not another notification.

### Why Reminders Fail

Human job: name the pain with precision.

SEO job: preserve authority around notification failure.

GEO job: explain the conceptual frame.

Conversion job: make OnTimer feel purpose-built.

Reason it appears here: after product proof, the deeper insight strengthens conviction.

If removed: OnTimer loses its category-defining argument.

What users should remember: the problem is follow-through, not memory.

### Use Cases

Human job: help visitors place themselves in the product.

SEO job: preserve meetings, appointments, flights, and critical timing language.

GEO job: clarify audience.

Conversion job: increase personal relevance.

Reason it appears here: after mechanism, visitors need fit.

If removed: the page may feel abstract.

What users should remember: this applies to my meetings and appointments.

### Time To Leave

Human job: show a concrete advanced capability.

SEO job: connect to Time To Leave intent.

GEO job: preserve association with location-based timing.

Conversion job: increase perceived utility without making the homepage a calculator.

Reason it appears here: after the core alarm behavior is clear.

If removed: OnTimer feels less differentiated for location-based events.

What users should remember: it can also tell me when to leave.

### Calculator Discovery

Human job: route tool-seeking visitors.

SEO job: pass authority to calculator pages.

GEO job: expose calculator families.

Conversion job: support secondary intent without stealing the hero.

Reason it appears here: calculator discovery should come after product conviction.

If removed: calculator discoverability weakens.

What users should remember: there are tools if I need a specific leave-time answer.

### Direct Answer And FAQ

Human job: answer remaining objections.

SEO job: preserve FAQ and direct-answer value.

GEO job: make the product easy for LLMs to summarize.

Conversion job: remove last doubts.

Reason it appears here: visitors who reach this point are evaluating details.

If removed: SEO and AEO weaken.

What users should remember: I understand what OnTimer is and how it differs.

### Final CTA

Human job: provide a clean decision point.

SEO job: none primary.

GEO job: none primary.

Conversion job: install.

Reason it appears here: the full story has been told.

If removed: the page ends without resolution.

What users should remember: I should try OnTimer.

## Mobile Specification

Mobile is the primary design surface.

### Thumb Reach

Primary buttons should be easy to tap with one hand. Tap targets should be at least 44px high. Avoid placing critical controls near awkward edges without enough padding.

### Viewport Height

The hero must respect common iPhone viewport heights. The primary CTA should appear before the visitor has to make a major scroll commitment.

### CTA Visibility

The App Store CTA should be visible in the first screen or immediately after the first short scan. The screenshot should never push the CTA into a buried position.

### Scroll Rhythm

Mobile scrolling should feel like a sequence of clear moments, not a long article. Each section should answer one question and then move on.

### Text Length

Mobile paragraphs should be short. If a paragraph wraps beyond four lines on common iPhone widths, it should be reconsidered.

### Image Sizing

Screenshots should be legible but not oversized. The hero image may be cropped or simplified on mobile if the full device frame consumes too much vertical space.

### Touch Targets

Navigation, CTA buttons, dropdowns, and calculator links should meet touch target expectations and have enough spacing to avoid accidental taps.

### Sticky Elements

Avoid a sticky CTA by default. Sticky CTAs can improve conversion, but they can also make a premium app page feel pushy. Consider only after launch data shows visitors understand the product but fail to act.

### Menu Behavior

The mobile menu should be grouped and scannable:

- Product
- Calculators
- Learn
- FAQ
- Download

It should close predictably, support keyboard navigation, and not trap focus incorrectly.

### Safe Areas

Respect iOS safe areas. Avoid placing essential controls where browser chrome or device edges make them uncomfortable.

### Dynamic Type

The layout should tolerate larger text sizes without clipped buttons, overlapping proof rows, or broken nav labels.

## Desktop Specification

Desktop should use space to create confidence.

### QR Scanning

Desktop's primary conversion advantage is QR scanning. The hero should make that path obvious.

The QR code should not feel like a fallback. It should feel like the intended desktop action.

### Visual Breathing Room

Desktop should feel spacious, not empty. Use the width to separate promise, proof, and product visual with calm hierarchy.

### Larger Imagery

The hero screenshot can be larger on desktop because users have room to inspect product proof. The visual should still support one story, not become a collage.

### Comparison Layouts

Desktop can use two-column comparisons where they clarify the difference between notifications and OnTimer alarms.

### Multi-Column Opportunities

Use multi-column layouts only when they reduce cognitive load. Do not create grids simply because desktop has space.

## SEO, GEO, And AEO Strategy

The redesign should make SEO nearly invisible to humans.

### Entity Recognition

The page must clearly identify:

- OnTimer
- iPhone app
- calendar alarm app
- automatic calendar alarms
- Google Calendar
- Apple Calendar
- Microsoft calendars
- persistent alarms
- Time To Leave
- multiple calendars

### Semantic Hierarchy

Use one H1. Section headings should follow the experience arc and describe the product clearly.

### Structured Data

Preserve structured data:

- SoftwareApplication
- WebSite
- Organization
- FAQPage

Validate after implementation.

### FAQ

Keep FAQ content, but make it feel like a helpful support section rather than visible SEO padding.

### Direct Answer

Include a concise Direct Answer section below the core product narrative. Do not place it in the hero.

### Calculator Discoverability

Expose calculator families through navigation, internal links, and a lower-page discovery section. Do not make the homepage a calculator interface.

## Homepage Anti-Patterns

Avoid:

- walls of text
- duplicate explanations
- equal-weight CTAs
- SEO paragraphs in the hero
- feature lists before the value proposition
- excessive card nesting
- competing focal points
- generic productivity language
- homepage bloat
- trying to satisfy every audience simultaneously
- screenshot collages without a single story
- promotional banners above the fold
- calculator directories masquerading as product strategy
- vague claims that are not grounded in product behavior
- medical, ADHD, or accessibility overclaims

## Implementation Acceptance Criteria

This section defines what "done" means before the redesign can be considered ready.

### UX Acceptance Criteria

- The hero communicates the product promise within five seconds.
- The page follows outcome, mechanism, proof.
- Every section has one clear job.
- The primary CTA is visually dominant at each CTA moment.
- Android waitlist is secondary to iPhone install.
- Calculator discovery exists without becoming the homepage's main purpose.
- Duplicate explanations are removed or consolidated.

### Accessibility Acceptance Criteria

- The page has one H1.
- Heading order is logical.
- All interactive elements are keyboard accessible.
- Focus states are visible.
- Tap targets are at least 44px where applicable.
- Color contrast meets WCAG AA.
- QR code links have descriptive accessible names.
- Product screenshots have meaningful alt text.
- Motion respects reduced-motion preferences.
- Navigation dropdowns support keyboard use and Escape behavior.

### SEO Acceptance Criteria

- Canonical URL is preserved.
- Metadata remains accurate and BrandOS-aligned.
- Structured data validates.
- FAQ schema is preserved where appropriate.
- Internal links to key authority and calculator pages remain.
- The page clearly identifies OnTimer as an iPhone calendar alarm app.
- Direct Answer content exists below the product narrative.

### Performance Acceptance Criteria

- Hero imagery is optimized.
- LCP is not degraded by oversized screenshots.
- CLS is not introduced by CTA hydration, QR rendering, fonts, or image dimensions.
- Unnecessary client-side code is avoided.
- Core Web Vitals are preserved or improved.

### Visual QA Acceptance Criteria

- Desktop, tablet, and mobile screenshots match the intended hierarchy.
- Hero CTA and screenshot do not compete.
- Text does not overlap or clip.
- Proof rows wrap cleanly.
- No section feels like an SEO article.
- No card nesting creates a cluttered dashboard feel.
- The page feels premium, calm, and product-led.

### Mobile Acceptance Criteria

- Primary App Store CTA is visible above the fold or immediately after the first short scan.
- Hero copy remains concise on common iPhone widths.
- Screenshot sizing does not bury the CTA.
- Menu groups are clear and tappable.
- Dynamic type does not break layout.
- Safe areas are respected.

### Desktop Acceptance Criteria

- QR code is the dominant hero conversion path.
- Any App Store listing link is secondary and not visually equal to QR.
- Hero uses space for clarity, not extra content.
- Dropdown navigation is usable by mouse and keyboard.
- Product screenshot is legible and clearly differentiated.

### Navigation Acceptance Criteria

- Calculator ecosystem is discoverable.
- Navigation scales beyond current calculator set.
- Labels have clear information scent.
- Mobile menu is grouped, not a long undifferentiated list.
- Header download behavior follows device-specific CTA rules.

### Legal Acceptance Criteria

- Privacy and Terms links remain accessible.
- Time To Leave paid-feature disclosure is preserved.
- App Store compliance text is not removed if required.
- No unsupported integration claims are introduced.
- No guarantee-like claims are added beyond approved BrandOS language.

## Post-Launch Validation

The redesign is not complete until post-launch validation passes.

Review:

- desktop screenshots
- mobile screenshots
- tablet screenshots
- before-and-after comparison
- Lighthouse report
- Core Web Vitals
- accessibility audit
- schema validation
- internal link audit
- CTA analytics
- QR analytics
- App Store analytics
- manual SEO review
- legal/footer link verification
- navigation behavior
- mobile menu behavior

Analytics should answer:

- Did mobile App Store click-through increase?
- Did desktop QR engagement increase?
- Did first-screen abandonment decrease?
- Did homepage organic visibility hold steady or improve?
- Did calculator discovery remain healthy?
- Did users scroll to product proof?
- Did any secondary CTA distract from install behavior?

If analytics contradict the design hypothesis, update this document before making major downstream changes.

## Critique And Open Risks

### Biggest Risks

The page may become too minimal and lose some perceived depth if SEO and educational content are trimmed too aggressively.

The hero promise `Never be late again` is strong and BrandOS-aligned, but it must be surrounded by grounded product behavior so it does not read like a guarantee.

The success of the redesign depends heavily on the quality of the hero screenshot. If the screenshot does not prove persistent alarm behavior, the page will rely too much on copy.

Desktop QR dominance is a hypothesis. It is strategically sound, but it must be validated against actual QR scans and downstream install behavior.

### Biggest Assumptions

The homepage is no longer the site's primary organic landing page.

Visitors are more likely to install after product clarity than after seeing broad content depth.

Calculator intent is better served by dedicated calculator pages than by embedding calculators on the homepage.

Desktop users are better served by QR scanning than by a prominent web App Store button.

### What To User Test First

- Five-second comprehension: what does OnTimer do?
- Fifteen-second differentiation: how is OnTimer different from a normal notification?
- First-click behavior: what do users click first on desktop and mobile?
- QR clarity: do desktop users understand the scan path?
- Mobile scroll comfort: does the page feel concise or long?

### Future A/B Tests

- `Never be late again` vs `Stay on time automatically`
- hero persistent-alarm screenshot vs automation/setup screenshot
- visible desktop QR vs button-triggered QR
- no desktop App Store button vs secondary text App Store listing link
- Android waitlist in hero text vs navigation only
- Direct Answer immediately after product proof vs lower FAQ placement

## Final Standard

The redesigned homepage should feel like OnTimer has grown up.

It should be simpler, not thinner. More premium, not more decorative. More product-led, not less searchable. More focused, not less informative.

Every future homepage change should protect that standard.

## Appendix A: Major Design Decisions

### Decision: The Homepage Is No Longer The Site's Primary SEO Landing Page

Reason:

Dedicated calculators and educational pages now drive the majority of organic acquisition.

Implication:

The homepage should optimize primarily for conversion while preserving SEO structurally.

### Decision: No Embedded Homepage Calculator

Reason:

The homepage has one job: sell the app.

Calculator pages have one job: solve calculator intent.

### Decision: Desktop QR Is Primary

Reason:

Desktop visitors cannot immediately install from their current device.

QR reduces friction.

### Decision: Outcome -> Mechanism -> Proof

Reason:

BrandOS.

Customers buy staying on time.

They do not buy alarms.

### Decision: Only One Hero Screenshot

Reason:

The product's differentiator should be obvious immediately.

### Version Status

Version: 1.0

Status: Approved Design Specification

Future homepage work should modify this document rather than creating competing homepage strategies.

Major philosophy changes should increment the version number.
