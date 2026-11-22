// Kept apart from members.ts so content.config.ts can import it without astro:content.

/** Filter options on the Members page, in display order. */
export const DISCIPLINES = [
  'Strength',
  'Running',
  'Conditioning',
  'Yoga',
  'Pilates',
  'Mobility',
  'Pre- and postnatal',
  'Nutrition',
  'Physiotherapy',
  'Sports therapy',
  'Massage',
  'Acupuncture',
  'Talking therapy',
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

/**
 * "What would you like help with?" on the Find a coach page, in plain
 * words, each mapped to the disciplines that cover it.
 */
export const NEEDS: { label: string; disciplines: (typeof DISCIPLINES)[number][] }[] = [
  { label: 'Getting stronger', disciplines: ['Strength'] },
  { label: 'Running', disciplines: ['Running'] },
  { label: 'Fitness and stamina', disciplines: ['Conditioning'] },
  { label: 'Yoga', disciplines: ['Yoga'] },
  { label: 'Pilates', disciplines: ['Pilates'] },
  { label: 'Moving more easily', disciplines: ['Mobility'] },
  { label: 'Pregnancy and after', disciplines: ['Pre- and postnatal'] },
  { label: 'Food and eating', disciplines: ['Nutrition'] },
  { label: 'Pain or an injury', disciplines: ['Physiotherapy', 'Sports therapy'] },
  { label: 'Massage', disciplines: ['Massage'] },
  { label: 'Acupuncture', disciplines: ['Acupuncture'] },
  { label: 'Stress and mental health', disciplines: ['Talking therapy'] },
];
