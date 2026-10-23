// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fledg.org',
  trailingSlash: 'ignore',
  // Class-based scoping lets a page style the root of a child component
  // (e.g. a <Photo class="avatar">) by passing it a class.
  scopedStyleStrategy: 'class',
});
