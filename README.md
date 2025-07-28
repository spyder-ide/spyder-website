# Spyder Website

![Spyder Logo](static/assets/media/spyder-logomark.png)

The official website for [Spyder IDE](https://www.spyder-ide.org) - a powerful scientific environment written in Python, for Python, and designed by and for scientists, engineers and data analysts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-orange.svg)](https://kit.svelte.dev/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue.svg)](https://pages.github.com/)

🌐 **Live Site**: [www.spyder-ide.org](https://www.spyder-ide.org)

## About

This repository contains the source code for the official Spyder IDE website. The site serves as:

- **Information hub** for Spyder features and capabilities
- **Download center** for installers and releases
- **Blog platform** for project updates and community news
- **Documentation gateway** linking to guides and resources
- **Community showcase** highlighting contributors and achievements

## Tech Stack

This website is built with modern web technologies:

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack web framework
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: [mdsvex](https://mdsvex.pngwn.io/) - Markdown processor for Svelte
- **Icons**: [Svelte Icons Pack](https://leshak.github.io/svelte-icons-pack/) - Icon library
- **Deployment**: [GitHub Pages](https://pages.github.com/) - Static site hosting
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - Automated deployment

## Features

- ✨ **Modern Design** - Clean, responsive interface
- 📱 **Mobile Optimized** - Works perfectly on all devices
- 🚀 **Fast Performance** - Static site generation for speed
- 📝 **Blog System** - Dynamic blog with author management
- 🎨 **Component Library** - Reusable UI components
- 🌍 **Internationalization** - Multi-language support ready
- ♿ **Accessibility** - WCAG compliant design
- 🔍 **SEO Optimized** - Meta tags and structured data

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Build locally

1. **Clone the repository**:
   ```shell
   git clone https://github.com/spyder-ide/spyder-website.git
   cd spyder-website
   ```

2. **Install dependencies**:
   ```shell
   npm install
   ```

3. **Start development server**:
   ```shell
   npm run dev
   ```
   
   The site will be available at [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command                           | Description                              |
| --------------------------------- | ---------------------------------------- |
| `npm run dev`                     | Start development server with hot reload |
| `npm run build`                   | Build the site for production            |
| `npm run preview`                 | Preview the production build locally     |
| `npm run generate-og-images`      | Generate Open Graph images               |
| `npm run generate-contrib-data`   | Generate contributor data                |
| `npm run generate-hubspot-data`   | Generate HubSpot integration data        |
| `npm run generate-funding-schema` | Generate funding schema                  |

## Project Structure

```text
spyder-website/
├── src/
│   ├── routes/                # Page routes and content
│   │   ├── +page.svelte       # Homepage
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog posts and pages
│   │   └── download/          # Download page
│   ├── lib/                   # Reusable components and utilities
│   │   ├── blocks/            # Page section components
│   │   ├── components/        # UI components
│   │   ├── config/            # Configuration and data
│   │   ├── i18n/              # Internationalization
│   │   ├── store/             # State management
│   │   └── utils/             # Utility functions
│   ├── app.css                # Global styles
│   └── app.html               # HTML template
├── static/                    # Static assets
│   └── assets/                # Images, fonts, media
├── scripts/                   # Build and utility scripts
└── ci/                        # CI/CD scripts
```

## Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions. The deployment process:

1. **Triggers** on push to `main` branch
2. **Builds** the static site using SvelteKit
3. **Generates** dynamic content (OG images, contributor data, etc.)
4. **Deploys** to GitHub Pages

### Manual Deployment

For manual deployment or testing:

```bash
# Build the site
npm run build

# Preview the built site
npm run preview
```

The built site will be available at [http://localhost:5174](http://localhost:5174)

## Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Reporting issues
- Setting up the development environment
- Creating blog posts
- Making code contributions
- Submitting pull requests

### Quick Contribution Steps

1. Fork and clone this repository
2. Create a topic branch (`git switch -c topic-branch-name-here`)
3. Make your changes
4. Test locally (`npm run dev`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push your branch to your fork (`git push -u origin topic-branch-name-here`)
7. Open a [Pull Request](https://github.com/spyder-ide/spyder-website/pull/new)

## Community

- 🐍 **Main Project**: [Spyder IDE](https://github.com/spyder-ide/spyder)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/spyder-ide/spyder/discussions)
- 🐛 **Issues**: [Bug Reports](https://github.com/spyder-ide/spyder-website/issues)
- 📧 **Mailing List**: [Google Groups](https://groups.google.com/group/spyderlib)
- 🐦 **Twitter**: [@Spyder_IDE](https://twitter.com/Spyder_IDE)

## License

This project is released under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## Acknowledgments

- Built with ❤️ by [@conradolandia](https://github.com/conradolandia) and the Spyder development team
- Special thanks to all [contributors](https://github.com/spyder-ide/spyder-website/graphs/contributors)
- Powered by [SvelteKit](https://kit.svelte.dev/) and [TailwindCSS](https://tailwindcss.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)

