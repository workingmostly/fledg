# fledg

The website for [fledg.org](https://fledg.org): a not-for-profit collective of qualified coaches and specialists. Every programme ends.

A static [Astro](https://astro.build) site built from the Claude Design handoff in [`design/`](design/). The pages match the design references at 1440, 1024 and 390 pixels wide.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/members/` | Members: browse and filter the collective |
| `/members/{id}/` | Member profile, one per member, generated from one template |
| `/where-the-money-goes/` | Itemised running costs |

How it works, Principles, Join the collective (the application form) and FAQ haven't been designed yet. Their links point to `#` for now; change them in one place in `src/data/site.ts`.

## Running it

You need Node 22.22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build
npm run check     # type-check
npm run design    # serve the design references to compare against
```

The build output in `dist/` is plain static files and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Where things live

```
src/
  content/members/*.md     one file per member (data in frontmatter, "About" in the body)
  content.config.ts        the member schema
  data/site.ts             nav links, contact email, placeholder-note switch
  data/money.ts            running costs; the joining fee is worked out from these
  data/members*.ts         filter options and helpers
  components/              Header, Footer, Button, Photo, MemberCard, PlaceholderNote
  layouts/BaseLayout.astro page shell, fonts and global CSS
  pages/                   one file per route
  styles/global.css        design tokens (colour, type, spacing) and shared classes
public/icons/              app icons used on the homepage
design/                    the original design references and spec (not deployed)
```

Client-side JavaScript is limited to the mobile menu and the Members filters. Breakpoints are CSS media queries at 1100px (nav collapses, filters fold away) and 760px (hero photos switch to a two-column grid).

## Editing content

**Members.** Add a Markdown file to `src/content/members/`. The file name is the URL (`ruth.md` becomes `/members/ruth/`). The basic fields (name, role, discipline, specialisms, price and so on) fill the card on the Members page and the top of the profile. The optional `profile:` block adds the rest of the profile: quote, full qualification list, photos, how I work, outcomes, timeline, who they bring in and contact details. Each profile section only shows when its data is there. `ruth.md` has every field and is the one to copy.

**Money.** Edit `src/data/money.ts`. The per-member figures, the total and the joining fee shown on the homepage are calculated from the yearly costs and the expected number of new members.

## Before launch

Everything below is placeholder content from the design and needs replacing:

- **Member names, qualifications, prices and programme lengths**, and **all money figures**. Figures carry a yellow highlight (the `ph` class). Remove the class from each one as it's confirmed.
- **Photos.** Free Pexels stand-ins, hotlinked from `images.pexels.com` (see `src/lib/photos.ts`). The shot list in `design/Fledge Overview.dc.html` describes what should replace them: real members and clients, with consent.
- **App icons** in `public/icons/` were taken from public favicons. Replace them with official brand assets and check each brand's guidelines.
- **Placeholder notes** (the small grey capitals saying "Placeholder photos and names"). Turn them all off with `showPlaceholderNotes` in `src/data/site.ts`.
- **Copy to confirm:** qualifications are checked before anyone joins; members are shown in random order; surplus money lowers next year's joining fee; the free 20-minute intro call; the paid photographer for new members; help choosing a coach by message; and the application steps, including the video call with members.
- **Links still pointing to `#`:** Principles, FAQ, Apply to join, Ask for a suggestion, booking an intro call and the accounts PDF.
