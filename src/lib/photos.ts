/**
 * Placeholder photography is hotlinked from Pexels (free licence, no attribution needed).
 * Replace with real member and client photos before launch; see the shot list in
 * design/Fledge Overview.dc.html.
 */
export function pexels(id: number, width: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** 1x and 2x sources for an image displayed at roughly `width` CSS pixels. */
export function pexelsSrcset(id: number, width: number): string {
  return `${pexels(id, width)} 1x, ${pexels(id, width * 2)} 2x`;
}
