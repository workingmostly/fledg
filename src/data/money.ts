/**
 * Running costs and the joining fee. All figures are placeholders until the
 * real numbers arrive; they are highlighted wherever they appear.
 *
 * The joining fee is the year's expected costs divided by the number of
 * members expected to join, so it's derived here rather than typed in.
 */

export const lastUpdated = '1 October 2026';
export const costsPeriod = 'April 2026 to March 2027';
export const expectedNewMembers = 24;

export interface Cost {
  name: string;
  description: string;
  perYear: number;
  /** Colour in the stacked bar on the joining-fee card. */
  colour: string;
}

export const costs: Cost[] = [
  {
    name: 'Qualification checks',
    description: 'Checking every new member’s certificates, registrations and insurance with the bodies that issued them.',
    perYear: 1080,
    colour: 'oklch(0.40 0.07 220)',
  },
  {
    name: 'Member photography',
    description: 'A local photographer spends half a day with each new member, so every face on this site is real.',
    perYear: 900,
    colour: 'oklch(0.52 0.065 215)',
  },
  {
    name: 'Accounts and filing',
    description: 'An independent accountant prepares and files our annual accounts.',
    perYear: 660,
    colour: 'oklch(0.64 0.055 210)',
  },
  {
    name: 'Website and email',
    description: 'Hosting, the domain name and one shared inbox.',
    perYear: 360,
    colour: 'oklch(0.76 0.045 205)',
  },
  {
    name: 'Insurance',
    description: 'Public liability cover for Fledg itself. Members hold their own professional insurance.',
    perYear: 324,
    colour: 'oklch(0.86 0.035 205)',
  },
  {
    name: 'Bank and payment fees',
    description: 'A business bank account, and card fees on joining payments.',
    perYear: 144,
    colour: 'oklch(0.78 0.012 80)',
  },
  {
    name: 'Reserve',
    description: 'Set aside for costs we didn’t expect. Capped at three months of running costs.',
    perYear: 132,
    colour: 'oklch(0.64 0.012 75)',
  },
];

export const perMember = (cost: number) => cost / expectedNewMembers;

export const totalPerYear = costs.reduce((sum, c) => sum + c.perYear, 0);
export const joiningFee = perMember(totalPerYear);

/** £1,080 by default; £45.00 with pence. */
export function gbp(amount: number, pence = false): string {
  const digits = pence || !Number.isInteger(amount) ? 2 : 0;
  return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
