/**
 * POST /api/sign-up: emails a client's sign-up to Fledg and their chosen coach.
 * The only server route on the site; nothing is stored.
 *
 * Environment (set in Vercel):
 *   RESEND_API_KEY  key for resend.com, which sends the email
 *   SIGNUP_FROM     sender, default "Fledg <hello@fledg.org>" (domain must be verified in Resend)
 *
 * Without a key, preview and local builds do a dry run and report who the email
 * would have gone to; production answers 503 so the page can point people to
 * Fledg's inbox instead.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { RESEND_API_KEY, SIGNUP_FROM, VERCEL_ENV } from 'astro:env/server';
import { FLEDG_INBOX, SignUp, signUpEmail } from '../../lib/sign-up';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid' }, 400);
  }
  const parsed = SignUp.safeParse(body);
  if (!parsed.success) {
    return json({ error: 'invalid', fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] }, 400);
  }
  const input = parsed.data;
  // Bots fill in the hidden field; tell them it worked and send nothing.
  if (input.website) return json({ ok: true });

  const members = await getCollection('members');
  const byId = new Map(members.map((m) => [m.id, m]));
  const coach = input.coach ? byId.get(input.coach) : undefined;
  if (input.coach && coach?.data.role !== 'coach') return json({ error: 'invalid', fields: ['coach'] }, 400);

  const suggested = input.suggested.flatMap((id) => {
    const m = byId.get(id);
    return m ? [m.data] : [];
  });
  const coachEmail = coach?.data.email;
  const { subject, text } = signUpEmail(input, coach?.data, Boolean(coachEmail), suggested);
  const to = coachEmail ? [FLEDG_INBOX, coachEmail] : [FLEDG_INBOX];

  if (!RESEND_API_KEY) {
    if (VERCEL_ENV === 'production') return json({ error: 'not-configured' }, 503);
    return json({ ok: true, dryRun: true, to, coachHasEmail: Boolean(coachEmail), subject });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: SIGNUP_FROM || `Fledg <${FLEDG_INBOX}>`,
        to,
        reply_to: input.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error('Sign-up email failed', res.status, await res.text());
      return json({ error: 'send-failed' }, 502);
    }
  } catch (error) {
    console.error('Sign-up email failed', error);
    return json({ error: 'send-failed' }, 502);
  }
  return json({ ok: true, coachHasEmail: Boolean(coachEmail) });
};
