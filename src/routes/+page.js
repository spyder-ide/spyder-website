// OS Detection
import { base } from "$app/paths";
import { browser } from "$app/environment";
import { getOS, getOSButtons } from "$lib/utils";

// Content for blocks
import Interactive from "$lib/content/interactive.md";
import Ecosystem from "$lib/content/ecosystem.md";
import WhatIs from "$lib/content/what-is.md";
import Growth from "$lib/content/growth.md";
import Setup from "$lib/content/setup.md";

// Tabs integrations
import Matplotlib from "$lib/content/matplotlib.md";
import Pandas from "$lib/content/pandas.md";
import Conda from "$lib/content/conda.md";
import Sympy from "$lib/content/sympy.md";
import Numpy from "$lib/content/numpy.md";

// Tabs growth
import DeveloperTools from "$lib/content/developer-tools.md";
import Projects from "$lib/content/projects.md";
import CodeAnalysis from "$lib/content/code-analysis.md";
import Search from "$lib/content/search.md";

// Sponsors
import Sponsors from "$lib/content/sponsors.md";
import Donations from "$lib/content/donations.md";

let frontPage = {},
  os = "linux",
  osButtons = [];

// OS buttons
if (browser) {
  os = getOS();
  osButtons = getOSButtons(base, os);
}

// Content blocks
frontPage = {
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
      // What is Spyder
      {
        id: "what-is-spyder-section",
        imgSrc: "/assets/media/banner.svg",
        background: "/assets/media/bg.svg",
        columns: false,
        divider: true,
        extraContent: WhatIs,
      },

      // Interactive
      {
        id: "interactive-section",
        title: "Interactive programming everywhere",
        divider: true,
        border: false,
        video: false,
        content: Interactive,
        tabs: [
          {
            title: "Variable Explorer",
            isVideo: true,
            content: {
              videoSources: [
                {
                  src: "/assets/media/variable_explorer.mp4",
                },
              ],
              videoCaption: "Explore variables after execution",
            },
          },
          //{ title: "Debugger", content: Debugger },
          {
            title: "Editor",
            isVideo: true,
            content: {
              videoSources: [
                {
                  src: "/assets/media/editor.mp4",
                },
              ],
              videoCaption: `Run code in sections called "cells"`,
            },
          },
        ],
      },

      // Ecosystem
      {
        id: "pydata-section",
        title: "Seamless integration with the PyData ecosystem",
        divider: true,
        content: Ecosystem,
        tabs: [
          { title: "Matplotlib", content: Matplotlib },
          { title: "Pandas", content: Pandas },
          { title: "Numpy", content: Numpy },
          { title: "Conda", content: Conda },
          { title: "Sympy", content: Sympy },
        ],
      },

      // Growth
      {
        id: "growth-section",
        title: "It grows with you",
        divider: true,
        content: Growth,
        tabs: [
          { title: "Developer tools", content: DeveloperTools },
          { title: "Projects", content: Projects },
          { title: "Code analysis", content: CodeAnalysis },
          { title: "Search code", content: Search },
        ],
      },

      // Setup
      {
        id: "setup-section",
        title: "Zero setup process",
        content: Setup,
        divider: true,
        imgSrc: `/assets/media/${os}.webp`,
        buttons: osButtons,
      },

      // Sponsors
      {
        id: "sponsors-section",
        title: "Sponsors",
        content: Sponsors,
        divider: true,
        columns: false,
        boxed: true,
        extraContent: Donations,
        extraImage: "/assets/media/sponsors.svg",
        extraImageAlt: "Donate to our project",
        extraImageLink: "https://opencollective.com/spyder#support",
        innerColumnsClasses:
          "flex flex-col xl:flex-row items-center gap-8 xl:gap-16 max-w-xl mx-auto",
        innerColumns: [
          {
            imgSrc: "/assets/media/Chan_Zuckerberg_Initiative.svg",
            link: "https://chanzuckerberg.com/",
          },
          {
            imgSrc: "/assets/media/numfocus_lrg.png",
            link: "https://numfocus.org/",
          },
        ],
      },

      // Learn more
      {
        id: "learn-more-section",
        columns: false,
        boxed: true,
        background: "/assets/media/bg_more.svg",
        innerColumns: [
          {
            title: "YouTube Channel",
            content: "Learn more about Spyder",
            icon: "BsYoutube",
            link: "https://www.youtube.com/c/spyderide",
            aspect: "xl:aspect-square",
          },
          {
            title: "Documentation",
            content: "Read the docs",
            icon: "BsBookHalf",
            link: "https://docs.spyder-ide.org",
            aspect: "xl:aspect-square",
          },
          {
            title: "GitHub",
            content: "Check out the source",
            icon: "BsGithub",
            link: "https://github.com/spyder-ide/spyder",
            aspect: "xl:aspect-square",
          },
          {
            title: "Donations",
            content: "Show your support",
            icon: "BsHeartFill",
            link: "https://opencollective.com/spyder",
            aspect: "xl:aspect-square",
          },
        ],
      },
    ],
  },
};

// Load content and process blocks
export function load() {
  return frontPage;
}
