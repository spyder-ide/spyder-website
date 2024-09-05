// Imports
import { dev } from "$app/environment";
import { base } from "$app/paths";

//////////////////////////////////////////////////////////////////
// Site config
//////////////////////////////////////////////////////////////////

// Base URL
export const siteUrl = dev
  ? "http://localhost:5173/"
  : "https://www.spyder-ide.org/";

// Website metadata
export const title = "Spyder";
export const subtitle =
  "The Python IDE that scientists and data analysts deserve";
export const comment =
  "Designed by the community, for the community";
export const author = "Spyder Website Contributors";
export const description = subtitle;
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

// Github button
export const githubButton = {
  highlight: false,
  icon: "github",
  text: "Checkout on GitHub",
  href: "https://github.com/spyder-ide/spyder/",
}

// Download links
export const releases = {
  windows: {
    x64: {
      name: "Windows 10+",
      link: "https://github.com/spyder-ide/spyder/releases/latest/download/Spyder-Windows-x86_64.exe",
    },
  },
  linux: {
    x64: {
      name: "Linux",
      link: "https://github.com/spyder-ide/spyder/releases/latest/download/Spyder-Linux-x86_64.sh",
    },
  },
  mac: {
    arm64: {
      name: "macOS 14.0+ (M1)",
      link: "https://github.com/spyder-ide/spyder/releases/latest/download/Spyder-macOS-arm64.pkg",
    },
    x64: {
      name: "macOS 12.0+ (Intel)",
      link: "https://github.com/spyder-ide/spyder/releases/latest/download/Spyder-macOS-x86_64.pkg",
    },
  },
};

export const footerTitle = "Connect with us on";
