// Imports
import { dev } from "$app/environment";
import { base } from "$app/paths";

//////////////////////////////////////////////////////////////////
// Site config
//////////////////////////////////////////////////////////////////

// Base URL
export const url = dev
  ? "http://localhost:5173/"
  : "https://www.spyder-ide.org/";

// Website metadata
export const title = "Spyder IDE";
export const subtitle =
  "The Python IDE that scientists and data analysts deserve";
export const comment =
  "Carefully designed by a dedicated team of scientists to meet our needs";
export const author = "Spyder Website Contributors";
export const description = `${subtitle}. ${comment}`;
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

// Blog metadata
export const blogTitle = "Welcome to Spyder's Blog";

// Navigation
export const navigation = [
  [
    {
      text: "Download",
      href: `${base}/download/`,
      target: "_self",
    },
  ],
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
  facebook: "https://www.facebook.com/SpyderIDE/",
  mastodon: "https://fosstodon.org/@Spyder",
  instagram: "https://instagram.com/spyderide",
};

// Hero content
export const heroContent = {
  title: subtitle,
  description: comment,
};

// Images in hero
export const heroImages = {
  dark: `${base}/assets/media/screenshot_dark.webp`,
  light: `${base}/assets/media/screenshot_light.webp`,
};

// Download links
export const releases = {
  linux: {
    x64: {
      name: "Ubuntu 18.04+",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/EXPERIMENTAL-Spyder-5.5.5-Linux-x86_64.sh",
    },
  },
  windows: {
    x64: {
      name: "Windows 10+",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder_64bit_full.exe",
    },
  },
  mac: {
    x64: {
      name: "MacOS (Intel)",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder.dmg",
    },
    arm64: {
      name: "MacOS (M1)",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder_arm64.dmg",
    },
  },
};
