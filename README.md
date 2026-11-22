# fledg

The website for [fledg.org](https://fledg.org): a not-for-profit collective of qualified coaches and specialists. Every programme ends.

An [Astro](https://astro.build) site built from the Claude Design handoff in [`design/`](design/). The pages match the design references at 1440, 1024 and 390 pixels wide.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/members/` | Members: browse and filter the collective |
| `/members/{id}/` | Member profile, one per member, generated from one template |
| `/where-the-money-goes/` | Itemised running costs |
| `/find-a-coach/` | A few questions, then suggested coaches and specialists. Every "Find a coach" button leads here (runs in the browser; nothing is stored) |

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

Every page is pre-rendered to static HTML. The one exception is `/api/sign-up`, a small server function that emails sign-ups from the Find a coach page, which is why the site uses Vercel's Astro adapter. Vercel deploys it from GitHub: every branch gets a preview, and `main` goes to fledg.org.

### Sign-up emails

When a client signs up on `/find-a-coach/`, their answers go by email to hello@fledg.org and to the coach they chose. Nothing is stored. To turn it on:

1. Create a [Resend](https://resend.com) account and verify the fledg.org domain there (it gives you DNS records to add).
2. Create an API key and add it in Vercel as `RESEND_API_KEY` (Project settings, Environment variables), for Production and, if you want previews to send real email, Preview.
3. Optional: `SIGNUP_FROM` sets the sender (default `Fledg <hello@fledg.org>`).
4. Add an `email:` line to each member's file in `src/content/members/`. It's never shown on the site. Sign-ups for a member without one go to Fledg only, with a note to pass them on.

Without a key, previews and local runs do a dry run and say where the email would have gone. Production says it couldn't send and points people to hello@fledg.org.

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
public/favicon.*, icon-*    logo mark (lowercase "f" on duck egg); social avatars in public/brand/
design/                    the original design references and spec (not deployed)
```

Client-side JavaScript is limited to the mobile menu, the Members filters, the homepage photo slideshow and the Find a coach questions. The one breakpoint is a CSS media query at 1100px (the nav collapses and the filters fold away); everything else reflows with flex-wrap and auto-fit grids.

## Editing content

**Members.** Add a Markdown file to `src/content/members/`. The file name is the URL (`ruth.md` becomes `/members/ruth/`). The basic fields (name, role, discipline, specialisms, price and so on) fill the card on the Members page and the top of the profile. Optional `booking` (a Calendly or similar link for intro calls) and `social` (a list of labelled links) go on the profile's booking button and contact section. The optional `profile:` block adds the rest of the profile: quote, full qualification list, photos, how I work, outcomes, timeline, who they bring in and contact details. Each profile section only shows when its data is there. `ruth.md` has every field and is the one to copy.

**Money.** Edit `src/data/money.ts`. The per-member figures, the total and the joining fee shown on the homepage are calculated from the yearly costs and the expected number of new members.

## Before launch

Everything below is placeholder content from the design and needs replacing:

- **Member names, qualifications, prices and programme lengths**, and **all money figures**. Figures carry a yellow highlight (the `ph` class). Remove the class from each one as it's confirmed.
- **Photos.** Free Pexels stand-ins, hotlinked from `images.pexels.com` (see `src/lib/photos.ts`). The shot list in `design/Fledge Overview.dc.html` describes what should replace them: real members and clients, with consent.
- **App icons** in `public/icons/` were taken from public favicons. Replace them with official brand assets and check each brand's guidelines.
- **Placeholder notes** (the small grey capitals saying "Placeholder photos and names"). Turn them all off with `showPlaceholderNotes` in `src/data/site.ts`.
- **Copy to confirm:** qualifications are checked before anyone joins; members are shown in random order; surplus money lowers next year's joining fee; the free 20-minute intro call; the paid photographer for new members; help choosing a coach by message; and the application steps, including the video call with members.
- **Sign-up emails:** set up Resend and members' email addresses (see *Sign-up emails* above). Until then production sign-ups show an error and point to hello@fledg.org.
- **Links still pointing to `#`:** Principles, FAQ, Apply to join, booking an intro call (for members without a booking link) and the accounts PDF.
