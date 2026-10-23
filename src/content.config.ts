import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { DISCIPLINES, SPECIALISMS } from './data/members-options';

const photo = z.object({
  /** Pexels photo id (placeholder). */
  id: z.number(),
  /** object-position for the crop, e.g. "50% 40%". */
  position: z.string().default('50% 50%'),
  alt: z.string(),
});

/**
 * Optional long-form profile content. Each section of the profile page only
 * renders when its data is here, so a new member can start with the basics.
 */
const profile = z.object({
  /** Replaces the city in the profile header, e.g. "Manchester, coaching by video across the UK". */
  location: z.string().optional(),
  portrait: z.object({ alt: z.string().optional(), caption: z.string().optional() }).optional(),
  quote: z.string().optional(),
  /** Rough total for the whole programme, e.g. "£440". */
  totalPrice: z.string().optional(),
  calls: z.object({ value: z.string(), note: z.string().optional() }).optional(),
  messages: z.object({ value: z.string(), note: z.string().optional() }).optional(),
  /** Date Fledg checked certificates and insurance, e.g. "2 September 2026". */
  checked: z.string().optional(),
  /** Full qualification list. Falls back to `qualifications` when left out. */
  credentials: z.array(z.object({ name: z.string(), detail: z.string().optional() })).optional(),
  gallery: z.array(photo.extend({ caption: z.string().optional() })).optional(),
  howIWork: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
  outcomes: z.array(z.string()).optional(),
  timeline: z
    .object({
      intro: z.string(),
      stages: z.array(
        z.object({
          weeks: z.string(),
          title: z.string(),
          text: z.string(),
          /** Relative width of the stage. */
          span: z.number(),
          /** Who writes the programme: coach, together, you, or after (dashed). */
          bar: z.enum(['coach', 'together', 'you', 'after']),
        }),
      ),
    })
    .optional(),
  bringsIn: z
    .array(z.object({ member: z.string(), label: z.string(), when: z.string() }))
    .optional(),
  contact: z
    .object({
      hours: z.string().optional(),
      whatsapp: z.string().optional(),
      whatsappNote: z.string().optional(),
      email: z.string().optional(),
      emailNote: z.string().optional(),
    })
    .optional(),
});

const members = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string(),
    gender: z.enum(['woman', 'man', 'nonbinary']),
    role: z.enum(['coach', 'specialist']),
    discipline: z.enum(DISCIPLINES),
    title: z.string(),
    city: z.string(),
    qualifications: z.array(z.string()),
    /** Shorter line for the homepage cards. */
    shortQualifications: z.string().optional(),
    specialisms: z.array(z.enum(SPECIALISMS)),
    price: z.string(),
    length: z.string(),
    taking: z.boolean(),
    photo,
    profile: profile.optional(),
  }),
});

export const collections = { members };
