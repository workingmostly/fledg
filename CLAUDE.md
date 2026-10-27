# Fledg website (fledg.org)

A static Astro site. `README.md` explains the structure and how to edit content. `design/README.md` is the original design spec, and `design/*.dc.html` are the design references. The "Design updates since the handoff" section at the end of `design/README.md` overrides the references where they differ (tagline, logo mark, homepage hero slideshow, duck egg primary buttons).

## Working rules
- The design references are the source of truth for layout, colour, type and copy. Serve them with `npm run design` and compare side by side at 1440px, 1024px and 390px before and after a visual change.
- Take colours and sizes from the tokens in `src/styles/global.css`. Add a token rather than repeating a raw value in several places.
- Use CSS media queries for breakpoints (1100px; the 760px compact breakpoint went with the old hero montage), not JS width detection. Keep client-side JS to the mobile menu, the Members filters and the homepage slideshow.
- Members are a content collection in `src/content/members/`. Profiles come from one template, `src/pages/members/[id].astro`, and each section renders only when its data exists.
- Money figures live in `src/data/money.ts`; the joining fee is derived from them. Don't hard-code it elsewhere.
- Copy: British English, plain and calm. No hype words (transform, journey, unlock, shred, ultimate), no fake urgency, no before-and-after imagery. Fledg is not for profit but is **not** a registered charity, so never call it one. In client-facing parts, don't lead with "not for profit".
- Keep every placeholder figure highlighted (`ph` class) until real numbers arrive.
- Don't add sections, pages or features that aren't in the design. Ask first.
- Run `npm run check` and `npm run build` before committing.

## Not designed yet
How it works (as its own page), Principles, Join the collective (application form) and FAQ. Their links live in `src/data/site.ts`.

## Previews
- After every change, also push it to a new `preview/<short-name>` branch (e.g. `preview/hero-slideshow`) so it can be viewed on its own.
- Vercel (project `fledg`, team `will-greens-projects`) builds every branch. A branch's preview lives at `https://fledg-git-<branch, with / as ->-will-greens-projects.vercel.app`. Wait for the build to be READY, then share that link.
- Vercel skips a push whose commit it has already built for another branch, so a preview branch pointing at the same commit as the working branch gets no deployment of its own. When that happens, create the deployment for the preview branch through the Vercel API (git source: `workingmostly/fledg`, ref = the preview branch).
- Previews need a Vercel login (Vercel Authentication is on). To share with someone without access, create a temporary share link.
