import { getContributors } from "$lib/utils";

export async function load({ fetch }) {
  const contributors = await getContributors(fetch);
  return contributors;
}

export const prerender = true;
