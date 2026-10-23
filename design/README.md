# Handoff: Fledg website (fledg.org)

## Overview
Fledg is a not-for-profit collective of qualified personal trainers, nutritionists, physiotherapists and other health and fitness specialists. Clients pick one primary coach, the wider collective chips in when needed, and every programme has an end date: the client learns to train, eat and recover on their own. Fledg takes no money from client fees; members pay a one-time joining fee that covers running costs, published line by line.

This bundle covers four designed pages (desktop and mobile):
1. **Home**
2. **Members** (browse and filter the collective)
3. **Member profile** (example: Ruth Adeyemi)
4. **Where the money goes** (itemised running costs)

Plus **Fledge Overview**, a presentation canvas showing all pages side by side with the visual system and a photography shot list.

Still to design (nav links currently point to `#`): How it works, Principles, Join the collective (application form), FAQ.

## About the design files
The files in `design/` are **design references built in HTML**: working prototypes that show the intended look, copy and behaviour. They are not production code. The task is to **recreate them in a real codebase**. If there is no existing codebase, we recommend:

- **Astro** (static output, zero JS by default) with plain CSS or CSS modules. Only the Members filters and the mobile menu need client-side JS (an Astro island, or a few lines of vanilla JS).
- Members as a content collection (`src/content/members/*.md` or one JSON file) so profiles are generated from one template.
- Self-hosted fonts via Fontsource (`@fontsource-variable/newsreader`, `@fontsource-variable/schibsted-grotesk`, `@fontsource/ibm-plex-mono`).
- Deploy on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

To view the references: serve the `design/` folder over HTTP (for example `npx serve design`) and open `Home.dc.html`. Each `.dc.html` file renders itself through `support.js`, which must sit beside it. Styling is inline on every element, so the source is the place to read exact values.

## Fidelity
**High fidelity.** Colours, type, spacing, copy and interactions are final, apart from the placeholders listed below. Recreate it pixel-perfectly.

## Global layout
- **Page background**: paper `#f8f5f0`. **Text**: ink `#1f1a15`.
- **Container**: `max-width: 1320px; margin: 0 auto; padding-inline: clamp(20px, 4vw, 48px)`.
- **Section padding**: `clamp(72px, 9vw, 136px)` top and bottom (some sections use 64–128px; check the source).
- **Breakpoints** (from viewport width):
  - `≥ 1100px`: full nav.
  - `< 1100px` (*narrow*): nav collapses to a pill "Menu" button that opens a full-width stacked menu; hero photo tags are hidden.
  - `< 760px` (*compact*): hero photos switch to a 2-column grid.
- Layouts use flex-wrap and grid `auto-fit` with `minmax(min(100%, Npx), 1fr)` so everything reflows. No fixed widths on text boxes.

### Header (all pages)
Sticky, 72px tall, `background: rgba(paper, 0.94)` with `backdrop-filter: blur(10px)`, 1px bottom border in the rule colour `#d4d0ca`.
- **Logo**: plain lowercase wordmark "fledg" in Newsreader 500, 32px, `letter-spacing: -0.035em`. No symbol, no treatment.
- **Nav (wide)**: How it works · Members · Principles · Where the money goes · FAQ · │ · Join the collective (links to `Home#join`) · **Find a coach** (dark pill button, 42px tall).
- **Nav (narrow)**: "Menu"/"Close" pill toggle. The panel lists the same links in Newsreader 28px, separated by rules, with a full-width "Find a coach" button at the bottom.

### Footer (all pages)
Ink background `#1f1a15`. 40px wordmark, the line "A not-for-profit collective of qualified coaches and specialists. Every programme ends.", then link columns *For clients* / *For coaches and specialists* / *Contact* (hello@fledg.org). Bottom bar: "© 2026 Fledg" and "No app. No contracts. No commission."

## Screens

### 1. Home (`Home.dc.html`)
1. **Hero**: fills the first screen (`min-height: calc(100vh - 72px)`). Flex column with `justify-content: space-between`.
   - **H1** (two lines, second in italic): "Get fit with a coach. / *Stay fit without one.*" Newsreader 400, `font-size: clamp(44px, min(6.4vw, 10.5vh), 96px)`, `line-height: 0.98`, `letter-spacing: -0.032em`.
   - **Lead** (Newsreader, `clamp(18px, 1.45vw, 22px)`, muted, max-width 660px): "One-to-one coaching from qualified people, in the gym and on video, around your working week. No subscription and no contract. Your coach teaches you to train, eat and recover, then sets you up to go it alone."
   - **CTAs**, left-aligned under the lead: "Find your coach" (primary) and "How it works" (secondary, scrolls to `#how`).
   - **Photo strip**: a rule, then the title "Recent *graduates.*" (Newsreader 24–30px), then 4 equal-width tiles (`grid-template-columns: repeat(4, 1fr); gap: 10px`). The strip grows to fill the space left in the viewport: `flex: 1 1 auto; min-height: clamp(180px, 22vh, 240px); max-height: 440px`. Each tile has a name tag pill at bottom-left ("Wendy, 58 · class of 2023"), hidden below 1100px.
   - **Compact (< 760px)**: 2-column grid, rows 156px, 6 tiles (first spans 2 rows, fourth spans 2 columns); tags show the name only.
   - Alternative headline ("Make fitness part of *your life.*") and alternative photo titles ("Still *at it.*" with tags "finished in 2023", or no title) are in the reference as switches. Ship the defaults above.
2. **How it works** (`#how`): H2 "Nobody keeps their driving instructor after they pass." There are four stages, each with a stacked bar showing who writes the programme (coach = `#d4d0ca`-ish grey, you = teal `#075062`): 100/0, 50/50, 18/82 ("Coach checks"), 0/100. It closes with the line "Every programme has an end date. There's nothing to renew and nothing to cancel."
3. **Your team** (paper-alt `#f0ece4`): H2 "One coach who knows you. A whole collective behind them." A white card mockup of "Sam Whitaker · Your team": progress bar (week 6 of 16), primary coach with an 84px round photo, and a list of specialists with 40px round photos. Below it is "Some of the collective", a horizontal scroll-snap row of 3:4 member cards.
4. **Working with your coach** (duck egg `#b7dee3`): H2 "Train together in person. Keep in touch in between." It contains:
   - a 16:7 photo of an in-person session;
   - a phone chat mockup (generic WhatsApp-style: the coach adds a nutritionist to answer a food question);
   - a video call mockup (two 4:5 frames, Mute, Camera, Share screen, Leave);
   - a 4-column facts row: Sessions, Messages, Calls, Timing.
5. **No app, no lock-in** (`#apps`): H2 "Use what you already use. We don't have an app." On the right, a rounded panel (radius 28px, paper-alt) holds a 4×2 icon grid of 76px tiles with radius 22%: Hevy, Strong, MyFitnessPal and Cronometer (real icons), then CSS-drawn Notes, A spreadsheet and A notebook, and a dashed empty "Fledg app / Doesn't exist" tile. Note under the panel: "App icons belong to their makers. Fledg isn't connected to any of them."
6. **The money** (ink background): H2 "Every penny goes to the people coaching you. Fledg takes nothing." Supporting line: "Fledg is not for profit. It takes no share of what you pay, and it never holds your data." A large "£0" and three points. CTA: "See where the money goes" (light pill).
7. **Join** (`#join`, paper-alt): eyebrow "For coaches and specialists". H2 "Change people's lives for good."
   - A not-for-profit statement, three benefit bullets, and **Membership is by application** with three numbered steps. The £150 joining fee is in step 3, as plain text.
   - CTAs: **Apply to join** and "Read our principles".
   - 5:4 photo on the left (flex `wrap-reverse`, so the photo drops below the text on mobile).

### 2. Members (`Members.dc.html`)
- Intro with H1 "Choose one coach…" and a lead.
- **Filter sidebar** (sticky on wide screens, collapsible "Filters" toggle on narrow):
  - *Looking for*: radio pills for all / coach / specialist.
  - *Discipline*: multi-select pills with match counts.
  - *Specialism*: multi-select pills with counts.
  - *Gender*: radio pills.
  - *Taking clients only*: switch.
  - "Clear all filters" link, shown only when a filter is active.
- **Results**: grid `repeat(auto-fill, minmax(min(100%, 250px), 1fr))`, gap 48px/24px.
  - Each 4:5 photo card shows a status pill (dot plus "Taking clients" or "Full at the moment"), then name, title, city, qualifications, a role chip, specialism chips, and a price row.
  - Cards lift on hover (`translateY(-3px)`).
  - Empty state: dashed box with "No one matches all of those at the moment."
  - Results show in a random order, shuffled on load.
- "Not sure who to choose?" band (paper-alt) at the bottom.
- The data (15 members: name, pronouns, gender, role, discipline, specialisms, city, qualifications, price, programme length, taking clients) is the `MEMBERS` array in the file's script block.

### 3. Member profile (`Member Profile.dc.html`, Ruth Adeyemi)
Sections, in order:
1. Breadcrumb.
2. Header: 4:5 portrait and H1 name, title, pronouns, city, status, price and programme length, CTAs.
3. Qualifications: verified list.
4. About Ruth.
5. How I work: 4-up grid.
6. By the end you'll be able to…: numbered list on paper-alt.
7. Your 16 weeks: a 4-stage timeline.
8. Who I bring in, and when: three specialist cards with 88px photos.
9. Get in touch (duck egg): "Start with a free 20-minute call…", with WhatsApp and video options.

### 4. Where the money goes (`Where the Money Goes.dc.html`)
1. H1 "Fledg takes nothing. Here's…", with the last-updated date.
2. Two flow cards: client → coach at 100%, and member → one-time fee → running costs.
3. **This year's running costs**: an itemised table with a stacked bar.
4. **Ways we don't make money** (ink band).
5. Questions about money.

All figures are placeholders and are highlighted.

## Interactions and behaviour
- **Buttons**:
  - Primary: pill, 54px tall (42px in the nav), `padding: 0 28px`, ink background, paper text. On hover the background turns teal `#075062`.
  - Secondary: 1px ink outline. On hover it fills with ink and the text turns paper.
- **Links**: teal `#075062`, `text-underline-offset: 0.18em`, 1px underline. On hover they turn ink.
- **Smooth scrolling** for in-page anchors. Sections use `scroll-margin-top: 72px`.
- **Breakpoint detection**: the reference reads the viewport width from JS. In production, use CSS media queries and container queries instead.
- **Members filters**: state is role, discipline[], specialism[], gender and takingOnly. Counts update live, and a result label shows "All 15 members" or "N of 15 members".
- There are no animations beyond hover transitions (0.2s ease).

## Design tokens
| Token | Hex | OKLCH (source) |
|---|---|---|
| paper (page bg) | `#f8f5f0` | 0.972 0.008 85 |
| paper-alt (bands, panels) | `#f0ece4` | 0.945 0.012 85 |
| ink (text, dark bands, primary button) | `#1f1a15` | 0.22 0.012 65 |
| muted text | `#554f49` | 0.43 0.012 65 |
| rule / border | `#d4d0ca` | 0.86 0.01 80 |
| photo placeholder bg | `#e6e2dc` | 0.915 0.01 80 |
| duck egg (accent band) | `#b7dee3` | 0.875 0.042 205 |
| deep teal (links, eyebrows, "you") | `#075062` | 0.40 0.07 220 |
| teal pale (chips) | `#d6edf0` | 0.93 0.025 205 |
| teal ink (chip text) | `#004556` | 0.36 0.07 220 |
| text on duck egg | `#19262b` | 0.26 0.02 220 |
| eyebrow on duck egg | `#003442` | 0.30 0.06 220 |
| muted on ink | `#c7c3bd` | 0.82 0.01 80 |
| footer label | `#9b9891` | 0.68 0.01 80 |
| placeholder highlight | `#f9e8a7` | 0.93 0.085 95 |
| call "Leave" red | `#b54b41` | 0.55 0.14 28 |
| nutritionist label (chat) | `#7e4328` | 0.45 0.09 45 |

**Type**
- **Newsreader** (variable, optical size 6–72): headlines and long-form reading.
  - H1: `clamp(44px, 6.4vw, 96px)`, line-height ~0.98, letter-spacing -0.032em.
  - H2: `clamp(38px, 4.6vw, 68px)`, line-height 1.03, letter-spacing -0.022em.
  - H3: `clamp(26px, 2.2vw, 32px)`.
  - Lead: `clamp(19px, 1.5vw, 22px)`, line-height 1.5.
- **Schibsted Grotesk**: UI, body (16px, line-height 1.55), eyebrows (15px/500, teal), labels (13–14px).
- **IBM Plex Mono**: placeholder notes only (11px, uppercase, 0.05em tracking). Not part of the live site.
- Use `text-wrap: balance` on headlines and `pretty` on paragraphs.

**Radii**: photos 2px · cards 6–8px · panel 28px · app tiles 22% · pills 999px.
**Shadows**:
- Mockup card: `0 1px 2px rgba(31,26,21,.06), 0 32px 64px -32px rgba(31,26,21,.28)`.
- App tile: `0 1px 2px rgba(31,26,21,.10), 0 10px 24px -12px rgba(31,26,21,.35)`.

## Copy rules
- British English throughout: plain words, short sentences, calm and confident.
- No hype words: transform, journey, unlock, shred, ultimate.
- No fake urgency, no countdowns and no before-and-after photos.
- Fledg is **not for profit** but is **not a registered charity**, so never describe it as one.
- In client-facing parts, don't lead with "not for profit"; keep it to the money and join sections.

## Placeholders (replace before launch)
- All member names, qualifications, prices, programme lengths and money figures. Figures carry the yellow highlight.
- All photos are free **Pexels** stand-ins, chosen for feel. The shot list in `Fledge Overview.dc.html` says what should replace them (real members and clients, with consent).
- Copy that needs confirming:
  - Qualifications are checked before anyone joins.
  - Members are shown in random order.
  - Surplus money lowers next year's joining fee.
  - A free 20-minute intro call.
  - A paid photographer for new members.
  - Help choosing a coach by message.
  - The application steps, including the video call with members.

## Assets
- **Photos (Pexels, free licence; no attribution needed)**: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}`
  - Hero: 38615519, 3752928, 7869513, 4587349 (plus 4854275 and 347134 on mobile).
  - Members:
    - ruth 8770421
    - helen 8844892
    - dan 5067669
    - priya 5793895
    - marek 39219660
    - aisha 7690849
    - callum 20860595
    - grace 6922170
    - jo 6551074
    - femi 36510739
    - sian 4587354
    - niamh 20860587
    - kwame 6456323
    - laura 8455976
    - alex 6388531
  - Profile extras: 8770407, 8770410.
  - In-person session: 6456323. Video call: 8770421 and 6937693. Join section: 39219674.
  - Crops use `object-fit: cover` with a per-photo `object-position`; see the source for each value.
- **App icons** (`design/assets/icons/`): `hevy.png`, `strong.png` (low resolution, 32px upscaled), `mfp.png`, `crono.png`. These were pulled from public favicons. Replace them with official brand assets and check each brand's usage guidelines before launch.

## Files
```
design/
  Home.dc.html                  Homepage (desktop + mobile, responsive)
  Members.dc.html               Members browse page with working filters + MEMBERS data
  Member Profile.dc.html        Profile template, filled with Ruth Adeyemi
  Where the Money Goes.dc.html  Money transparency page
  Fledge Overview.dc.html       Canvas: all pages + visual system + shot list
  support.js                    Runtime the .dc.html references need to render
  assets/icons/*.png            App icons used on Home
```

## Design updates since the handoff
These override the references and the sections above where they differ.

1. **Tagline: "Fitness for the long run."**
   - Homepage `<title>`: "Fledg · Fitness for the long run".
   - Other pages: "{Page name} · Fledg", e.g. "Members · Fledg", "Where the money goes · Fledg". Profiles: "{Name}, {title} · Fledg".
2. **Logo mark** for the favicon, social avatars and app icons.
   - A lowercase "f" in Newsreader weight 500, ink `#1f1a15` on duck egg `#b7dee3`, in a square tile.
   - Centre the "f" by eye, not by its outline: equal space above and below, with the stem slightly left of centre to balance the crossbar and hook. In CSS (1em box, `line-height:1`, `display:grid; place-items:center`) that is `position:relative; left:-0.03em; top:0.14em` on the glyph.
   - Exports: `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180px), manifest icons (192px and 512px), social avatars (400px and 1080px). They live in `public/` and `public/brand/`.
   - The "fledg" wordmark is unchanged: the font's default f–l joining, no letter-spacing tweaks.
3. **Homepage hero**
   - The whole hero section has a full-width duck egg background, `#b7dee3`. The header stays paper `#f8f5f0` with its bottom border.
   - Muted text inside the hero is `oklch(0.30 0.02 220)` (≈ `#1e3a44`) instead of `#554f49`, for contrast on duck egg.
   - Photo tile placeholder background in the hero: `oklch(0.80 0.035 205)` (≈ `#a3c9cf`).
   - No top border on the "How it works" section; the change of colour separates the two sections.
