import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
    // The metadata will be provided by MDSvex for individual blog posts
    // This is just to get the url of the post for the metadata
    return {
        url: url.href,
    };
}; 

export const prerender = true;
