/**
 * Site-wide links. Pages that haven't been designed yet (Principles, FAQ and the
 * application form) point to '#' until they exist.
 */
export const links = {
  home: '/',
  how: '/#how',
  members: '/members/',
  principles: '#',
  money: '/where-the-money-goes/',
  faq: '#',
  join: '/#join',
  apply: '#',
  suggest: '#',
  email: 'mailto:hello@fledg.org',
} as const;

/** Top-level sections that get a highlighted nav link. */
export type Section = 'members' | 'money';

export const contactEmail = 'hello@fledg.org';

/**
 * Show the IBM Plex Mono notes that flag placeholder photos, names and figures.
 * Turn off once real content is in place. (The yellow highlight on placeholder
 * figures is separate: remove the `ph` class from each figure as it's confirmed.)
 */
export const showPlaceholderNotes = true;

export const memberUrl = (id: string) => `/members/${id}/`;
