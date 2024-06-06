// Imports
import { dev } from "$app/environment";
import { base } from "$app/paths";

// Website metadata
export const title = "Spyder IDE";

export const author = "Spyder Website Contributors";

export const description =
  "The Python IDE that scientists and data analysts deserve";

export const keywords = [
  "Python",
  "IDE",
  "Spyder",
  "Matplotlib",
  "iPython",
  "Jupyter",
  "Science",
  "Data-Science",
  "Data-Analytics",
  "Programming",
];

export const url = dev
  ? "http://localhost:5173/"
  : "https://www.spyder-ide.org/";

export const blogTitle = "Welcome to Spyder's Blog";

// Navigation
export const navigation = [
  [
    {
      text: "Blog",
      href: `${base}/blog/`,
      target: "_self",
    },
    {
      text: "Docs",
      href: "https://docs.spyder-ide.org/",
      target: "_blank",
    },
  ],
];

// Social links (for footer and others)
export const socials = {
  github: "https://github.com/spyder-ide/spyder",
  twitter: "https://twitter.com/spyder_ide",
  mastodon: "https://fosstodon.org/@Spyder",
  instagram: "https://instagram.com/spyderide",
  facebook: "https://www.facebook.com/SpyderIDE/",
};

// Hero content
export const heroContent = {
  title: "The Python IDE that scientists and data analysts deserve",
  description:
    "Carefully designed by a dedicated team of scientists to meet our needs",
};
