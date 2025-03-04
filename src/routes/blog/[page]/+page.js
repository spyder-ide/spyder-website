import { generateBlogEntries, loadBlogPage } from "$lib/utils";

export const load = ({ params }) => loadBlogPage(parseInt(params.page));

export const entries = generateBlogEntries;
