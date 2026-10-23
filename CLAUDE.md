# Fledg website (fledg.org)

A static Astro site. `README.md` explains the structure and how to edit content. `design/README.md` is the original design spec, and `design/*.dc.html` are the design references.

## Working rules
- The design references are the source of truth for layout, colour, type and copy. Serve them with `npm run design` and compare side by side at 1440px, 1024px and 390px before and after a visual change.
- Take colours and sizes from the tokens in `src/styles/global.css`. Add a token rather than repeating a raw value in several places.
- Use CSS media queries for the breakpoints (1100px and 760px), not JS width detection. Keep client-side JS to the mobile menu and the Members filters.
- Members are a content collection in `src/content/members/`. Profiles come from one template, `src/pages/members/[id].astro`, and each section renders only when its data exists.
- Money figures live in `src/data/money.ts`; the joining fee is derived from them. Don't hard-code it elsewhere.
- Copy: British English, plain and calm. No hype words (transform, journey, unlock, shred, ultimate), no fake urgency, no before-and-after imagery. Fledg is not for profit but is **not** a registered charity, so never call it one. In client-facing parts, don't lead with "not for profit".
- Keep every placeholder figure highlighted (`ph` class) until real numbers arrive.
- Don't add sections, pages or features that aren't in the design. Ask first.
- Run `npm run check` and `npm run build` before committing.

## Not designed yet
How it works (as its own page), Principles, Join the collective (application form) and FAQ. Their links live in `src/data/site.ts`.
