# Contributing to the Spyder Website

Thank you for your interest in contributing to the Spyder website! This guide will help you get started with different types of contributions.

## Table of Contents

- [Contributing to the Spyder Website](#contributing-to-the-spyder-website)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Development Setup](#development-setup)
  - [Types of Contributions](#types-of-contributions)
  - [Creating Blog Posts](#creating-blog-posts)
    - [Adding New Authors](#adding-new-authors)
    - [Creating the Blog Post](#creating-the-blog-post)
  - [Code Contributions](#code-contributions)
    - [Guidelines](#guidelines)
    - [File Structure](#file-structure)
  - [Reporting Issues](#reporting-issues)
  - [Pull Request Process](#pull-request-process)
    - [Review Process](#review-process)
  - [Style Guidelines](#style-guidelines)
  - [Questions?](#questions)

## Getting Started

1. **Fork the repository** from [spyder-website](https://github.com/spyder-ide/spyder-website)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/spyder-website.git
   cd spyder-website
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b your-feature-branch
   ```

## Development Setup

1. **Install dependencies**:
   ```shell
   npm install
   ```

2. **Start the development server**:
   ```shell
   npm run dev
   ```

3. View the site at [http://localhost:5173](http://localhost:5173)
**Available scripts**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Types of Contributions

We welcome various types of contributions:

- **Blog posts** - Share news, tutorials, or insights about Spyder
- **Bug fixes** - Fix issues in the website functionality
- **Feature enhancements** - Improve existing features or add new ones
- **Documentation** - Improve clarity and completeness of documentation

## Creating Blog Posts

### Adding New Authors

If the blog post author(s) haven't been added yet:

1. **Create author folder** in `static/assets/authors/` using a simple identifier (no spaces/special characters)
2. **Add author files**:
   - Square avatar image (recommended: 512×512px WEBP format)
   - `metadata.json` file:
   ```json
   {
       "name": "Author's Display Name",
       "image": "filename.webp"
   }
   ```

### Creating the Blog Post

1. **Create post folder** in `src/routes/blog/` (folder name becomes URL slug - use lowercase, no spaces)

2. **Add main content file** `+page.md` with proper frontmatter:
   ```yaml
   ---
   title: Blog Post Title # Required
   author: author-id  # Required. For multiple authors, use array: [author1, author2]
   pub_date: YYYY-MM-DD # Required (ISO format)
   category: Category Name  # Optional
   tags: Tag1, Tag2  # Optional (comma-separated)
   summary: Concise overview of content # Required
   ---
   ```

3. **Write content** using [mdsvex](https://mdsvex.pngwn.io/) Markdown:
   - [Never indent code blocks](https://mdsvex.pngwn.io/docs#limitations)
   - Use standard Markdown syntax for formatting
   - Follow our [style guide](#style-guidelines) for consistency

4. **Add images** (if needed):
   ```markdown
   ![Meaningful description](image.webp "Optional caption")
   ```
   - Store images in the post's folder
   - Use descriptive alt text (avoid "image of...", "picture of...", etc.)
   - Prefer WEBP format for better performance

5. **Preview your post**:
   ```shell
   npm run dev
   ```
   - Verify post appears at `/blog/your-post-name`
   - Check author metadata and image display
   - Test on different screen sizes

## Code Contributions

### Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation if needed

### File Structure

- `src/routes/` - Page routes and content
- `src/lib/` - Reusable components and utilities
- `static/assets/` - Static assets (images, fonts, etc.)
- `src/app.css` - Global styles

## Reporting Issues

Before creating an issue:

1. **Search [existing issues](https://github.com/spyder-ide/spyder-website/issues)** to avoid duplicates
2. **Complete all relevant fields of the issue template**
3. **Include relevant details**:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Browser/OS information (if relevant)
   - Screenshots (if applicable)

## Pull Request Process

1. **Ensure your changes work locally**:
   ```shell
   npm run dev
   # Test your changes thoroughly
   ```

2. **Keep commits clean and descriptive**:
   ```bash
   git add .
   git commit -m "Add: New blog post about feature X"
   ```

3. **Push to your fork**:
   ```bash
   git push origin your-feature-branch
   ```

4. **Create Pull Request**:
   - Target the `main` branch
   - Use a clear, descriptive title
   - Fill out the PR template (if available)
   - Link any related issues

5. **After submission**:
   - Be responsive to feedback
   - Make requested changes promptly
   - Keep your branch updated with main if needed

### Review Process

- All PRs require review before merging
- CI/CD will automatically build and test your changes
- Reviewers may request changes or ask questions
- Once approved, maintainers will merge your PR

## Style Guidelines

- Use clear, concise language
- Follow existing naming conventions
- Maintain consistent formatting
- Optimize images for web (prefer WEBP format)
- Ensure accessibility best practices

## Questions?

If you have questions or need help:

- Check the [documentation](./README.md)
- Search [existing issues](https://github.com/spyder-ide/spyder-website/issues)
- Create a new issue with the "question" label

Thank you for contributing to the Spyder website! 🎉
