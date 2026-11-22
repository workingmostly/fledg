// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://fledg.org',
  trailingSlash: 'ignore',
  // Pages are pre-rendered to static HTML. The Vercel adapter is only there
  // for the one server route, /api/sign-up, which emails sign-ups.
  adapter: vercel(),
  // Read at runtime by /api/sign-up. Set them in Vercel; see README.md.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      SIGNUP_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Set by Vercel: "production", "preview" or "development".
      VERCEL_ENV: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  // Class-based scoping lets a page style the root of a child component
  // (e.g. a <Photo class="avatar">) by passing it a class.
  scopedStyleStrategy: 'class',
});
