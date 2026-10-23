// Kept apart from members.ts so content.config.ts can import it without astro:content.

/** Filter options on the Members page, in display order. */
export const DISCIPLINES = [
  'Strength',
  'Running',
  'Conditioning',
  'Nutrition',
  'Physiotherapy',
  'Sports therapy',
  'Mobility',
  'Pre- and postnatal',
] as const;

export const SPECIALISMS = [
  'Beginners',
  'Over 50s',
  'Back from injury',
  'Desk-based jobs',
  'Endurance events',
  'Menopause',
  'After pregnancy',
  'Plant-based eating',
] as const;

export const ROLES = [
  ['all', 'Everyone'],
  ['coach', 'Coaches'],
  ['specialist', 'Specialists'],
] as const;

export const GENDERS = [
  ['any', 'Any'],
  ['woman', 'Women'],
  ['man', 'Men'],
  ['nonbinary', 'Non-binary'],
] as const;
