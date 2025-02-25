import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, route }) => {
    // Get the metadata from the page module
    const path = url.pathname;
    const slug = path.split('/').filter(Boolean).pop();

    // This ensures the page is pre-rendered during build
    return {
        url: url.href,
        slug
    };
};

export const prerender = true; 
