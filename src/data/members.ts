import { getCollection, type CollectionEntry } from 'astro:content';

export type Member = CollectionEntry<'members'>;

export { DISCIPLINES, SPECIALISMS, ROLES, GENDERS } from './members-options';

export async function getMembers(): Promise<Member[]> {
  const members = await getCollection('members');
  return members.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getMember(id: string): Promise<Member> {
  const member = (await getCollection('members')).find((m) => m.id === id);
  if (!member) throw new Error(`No member with id "${id}" in src/content/members`);
  return member;
}

export const firstName = (m: Member) => m.data.name.split(' ')[0];
