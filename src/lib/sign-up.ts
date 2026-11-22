/**
 * Sign-ups from the Find a coach page: checking what the browser sent, and
 * writing the email that goes to Fledg and the chosen coach. Nothing here is
 * stored; the email is the only record.
 */
import { z } from 'astro/zod';

/** Where every sign-up is sent. */
export const FLEDG_INBOX = 'hello@fledg.org';

const text = (max: number) => z.string().trim().max(max);

export const SignUp = z.object({
  name: text(120).min(1),
  email: z.email().max(200),
  phone: text(40).default(''),
  note: text(2000).default(''),
  /** Member id of the coach they chose, or '' if they're not sure yet. */
  coach: text(80).default(''),
  answers: z.object({
    needs: z.array(text(80)).max(20).default([]),
    specialisms: z.array(text(80)).max(20).default([]),
    city: text(80).default(''),
    gender: text(40).default(''),
  }),
  /** Member ids the page suggested, coaches first. */
  suggested: z.array(text(80)).max(12).default([]),
  /** Honeypot: people leave it empty, form-filling bots don't. */
  website: text(200).default(''),
});
export type SignUp = z.infer<typeof SignUp>;

interface Person {
  name: string;
  title: string;
  city: string;
  role: 'coach' | 'specialist';
}

const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();
const firstName = (name: string) => oneLine(name).split(' ')[0];
const list = (items: string[]) => (items.length ? items.join(', ') : 'None given');

/** The email to Fledg (and the coach, if they have an address on file). */
export function signUpEmail(input: SignUp, coach: Person | undefined, coachHasEmail: boolean, suggested: Person[]) {
  const name = oneLine(input.name);
  const subject = coach
    ? `New sign-up: ${name} would like to start with ${coach.name}`
    : `New sign-up: ${name} would like help choosing a coach`;
  const coaches = suggested.filter((p) => p.role === 'coach').map((p) => p.name);
  const specialists = suggested.filter((p) => p.role === 'specialist').map((p) => p.name);

  const lines = [
    `${name} signed up through Find a coach on fledg.org.`,
    '',
    coach
      ? `They’d like to start with ${coach.name}, ${coach.title.toLowerCase()} in ${coach.city}.`
      : 'They’re not sure who to start with yet, so please suggest someone.',
    ...(coach && !coachHasEmail
      ? ['', `${coach.name} doesn’t have an email address on file yet, so this went to Fledg only. Please pass it on.`]
      : []),
    '',
    'CONTACT',
    `Name: ${name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || 'Not given'}`,
    '',
    'THEIR ANSWERS',
    `What they’d like help with: ${list(input.answers.needs)}`,
    `What applies to them: ${list(input.answers.specialisms)}`,
    `Where they are: ${input.answers.city || 'Somewhere else, or video is fine'}`,
    `Gender preference: ${input.answers.gender || 'No preference'}`,
    ...(input.note ? ['', 'IN THEIR OWN WORDS', input.note] : []),
    '',
    'SUGGESTED TO THEM',
    `Coaches: ${list(coaches)}`,
    `Specialists: ${list(specialists)}`,
    '',
    `Reply to this email to reach ${firstName(name)} directly.`,
  ];
  return { subject, text: lines.join('\n') };
}
