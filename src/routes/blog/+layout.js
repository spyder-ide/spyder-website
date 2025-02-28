export const load = async ({ url, route }) => {
    const path = url.pathname;
    const slug = path.split('/').filter(Boolean).pop();

    console.log("From layout:", `slug: ${slug}, url: ${url.href}`);

    return {
        url: url.href,
        slug
    };
};
