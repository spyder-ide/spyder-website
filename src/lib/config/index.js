// Imports
import { dev } from "$app/environment";
import { base } from "$app/paths";
import { getOS, getOSButtons } from "$lib/utils";

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
      text: "About",
      href: `${base}/about/`,
      target: "_self",
    },
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
  mastodon: "https://fosstodon.org/@Spyder",
  instagram: "https://instagram.com/spyderide",
  facebook: "https://www.facebook.com/SpyderIDE/",
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
  windows: {
    x86_64: {
      name: "Windows 10+",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder_64bit_full.exe",
    },
  },
  mac: {
    x86_64: {
      name: "MacOS (Intel)",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder.dmg",
    },
    arm: {
      name: "MacOS (Apple Silicon)",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/Spyder_arm64.dmg",
    },
  },
  linux: {
    x86_64: {
      name: "Ubuntu 18.04+",
      link: "https://github.com/spyder-ide/spyder/releases/download/v5.5.5/EXPERIMENTAL-Spyder-5.5.5-Linux-x86_64.sh",
    },
  },
};

//////////////////////////////////////////////////////////////////
// Front page
//////////////////////////////////////////////////////////////////

// OS Detection
const os = getOS();
const osButtons = getOSButtons(base, os);

// Content
import Interactive from "$lib/content/interactive.md";
import Selections from "$lib/content/selections.md";
import LearnMore from "$lib/content/learn-more.md";
import Ecosystem from "$lib/content/ecosystem.md";
import WhatIs from "$lib/content/what-is.md";
import Growth from "$lib/content/growth.md";
import Files from "$lib/content/files.md";
import Cells from "$lib/content/cells.md";
import Setup from "$lib/content/setup.md";

// Tabs integrations
import Matplotlib from "$lib/content/matplotlib.md";
import Pandas from "$lib/content/pandas.md";
import Conda from "$lib/content/conda.md";
import Sympy from "$lib/content/sympy.md";
import Numpy from "$lib/content/numpy.md";

// Tabs setup
import Windows from "$lib/content/windows.md";
import Linux from "$lib/content/linux.md";
import MacOs from "$lib/content/macos.md";

// Object
export const frontPage = {
  props: {
    // Hero section buttons
    buttons: [
      {
        highlight: false,
        icon: "github",
        text: "Checkout on GitHub",
        href: "https://github.com/",
      },
      ...osButtons,
    ],

    // Content blocks
    blocks: [
      {
        id: "what-is-spyder-section",
        imgSrc: `${base}/assets/media/banner.svg`,
        imgBlur: false,
        imgIcon: false,
        columns: false,
        divider: true,
        background: true,
        content: WhatIs,
      },
      {
        id: "interactive-section",
        divider: true,
        border: false,
        video: false,
        button: false,
        title: "Interactive programming everywhere",
        content: Interactive,
        tabs: [
          { title: "Variable Explorer", content: Files },
          { title: "Debugger", content: Cells },
          { title: "Editor", content: Selections },
        ],
      },
      {
        id: "pydata-section",
        divider: true,
        border: false,
        button: false,
        title: "Seamless integration with the PyData ecosystem",
        content: Ecosystem,
        tabs: [
          { title: "Matplotlib", content: Matplotlib },
          { title: "Pandas", content: Pandas },
          { title: "Numpy", content: Numpy },
          { title: "Conda", content: Conda },
          { title: "Sympy", content: Sympy },
        ],
      },
      {
        id: "growth-section",
        video: true,
        divider: true,
        videoId: "E2Dap5SfXkI",
        button: false,
        title: "It grows with you",
        content: Growth,
      },
      {
        id: "setup-section",
        border: false,
        video: false,
        title: "Zero setup process",
        content: Setup,
        divider: true,
        tabs: [
          { title: "Linux", content: Linux },
          { title: "Mac OS", content: MacOs },
          { title: "Windows", content: Windows },
        ],
        //button: true,
        //buttonText: `Download ${str}`,
        //buttonIcon: `${os}`,
        //buttonHref: `${base}/download?os=${os}`,
        //buttonHighlight: true,
      },
      {
        id: "learn-more-section",
        columns: false,
        imgSrc: `${base}/assets/media/yt.svg`,
        imgAlt: "Visit our Youtube channel",
        imgIcon: false,
        imgLink: "https://www.youtube.com/c/spyderide",
        imgClasses: "w-full h-full",
        content: LearnMore,
        boxed: true,
      },
    ],
  },
};
