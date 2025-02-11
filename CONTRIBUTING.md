# Contributing to the Spyder Website

1. Create a fork of the repository
2. Clone it and create a new branch for your changes
3. Install dependencies with `npm install`

## Creating a Blog Post

1. If the blog post author(s) haven't been added yet:
    1. Create a new folder in `static/assets/authors` using a simple identifier (no spaces/special characters)
    2. Inside this folder:
        - Add a square avatar image (recommended: 512×512px WEBP)
        - Create `metadata.json` with:
        ```json
        {
            "name": "Author's Display Name",
            "image": "filename.webp"
        }
        ```

2. Create a blog post folder in `src/routes/blog` (name becomes URL slug - lowercase, no spaces)

3. Add a `+page.md` file with this frontmatter:
```yaml
---
title: Blog Post Title # Required
author: author-id  # Required. For multiple authors, use an array of identifiers
pub_date: YYYY-MM-DD # Required
category: Category Name  # Optional
tags: Tag1, Tag2  # Optional
summary: Concise overview of content # Required
---
```

5. Write content using mdsvex Markdown:
    - [Never indent code blocks](https://mdsvex.pngwn.io/docs#limitations)
    - Use standard Markdown syntax for formatting

6. For images:
    ```markdown
    ![Meaningful description](image.webp "Optional caption")
    ```
    - Store images in the post's folder
    - All images require *descriptive* alt text (avoid "image of...", "picture of...", "photo of...", etc.)

7. Preview locally with:
```bash
npm run dev
```
    - Verify post appears at `/blog/`
    - Check author metadata and image display

8. There is no need to build for production, the workflow will run the build on GitHub Actions.

9. Create PR against upstream `main` branch.
