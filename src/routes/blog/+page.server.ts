import type { PageServerLoad } from './$types';
import { loadBlogPage } from '$lib/utils';
import { fetchAuthorsMetadataFromServer } from '$lib/utils/author.server';

export const load: PageServerLoad = async ({ url }) => {
    const path = url.pathname;
    const slug = path.split('/').filter(Boolean).pop();
    
    // Load the blog data
    const blogData = await loadBlogPage();
    
    // Enhance posts with author metadata from the server
    if (blogData.props.posts && blogData.props.posts.length > 0) {
        const enhancedPosts = await Promise.all(
            blogData.props.posts.map(async (post) => {
                // Ensure post.meta.author is an array
                const authorsArray = Array.isArray(post.meta.author)
                    ? post.meta.author
                    : [post.meta.author];
                
                // Fetch author metadata from the server
                const authorMetadata = await fetchAuthorsMetadataFromServer(authorsArray);
                
                // Return enhanced post
                return {
                    ...post,
                    authorMetadata
                };
            })
        );
        
        // Replace posts with enhanced posts
        blogData.props.posts = enhancedPosts;
    }
    
    return {
        ...blogData,
        url: url.href,
        slug
    };
};

export const prerender = true; 
