import { loadBlogPage, generateBlogEntries } from '$lib/utils';

export const load = ({ params }) => loadBlogPage(parseInt(params.page));

export const entries = generateBlogEntries;

export const prerender = true;
