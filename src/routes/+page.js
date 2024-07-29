// OS Detection
import { base } from "$app/paths";
import { browser } from "$app/environment";
import { getOS, getOSButtons } from "$lib/utils";

// Content for blocks
import Interactive from "$lib/content/interactive.md";
import LearnMore from "$lib/content/learn-more.md";
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

let frontPage = {},
  os = "",
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
      {
        id: "what-is-spyder-section",
        imgSrc: "/assets/media/banner.svg",
        background: "/assets/media/bg.svg",
        columns: false,
        divider: true,
        content: WhatIs,
      },
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
            },
          },
        ],
      },
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
      {
        id: "setup-section",
        title: "Zero setup process",
        content: Setup,
        divider: true,
        imgSrc: `/assets/media/${os}.webp`,
        buttons: osButtons,
      },
      {
        id: "learn-more-section",
        columns: false,
        imgSrc: "/assets/media/yt.svg",
        imgAlt: "Visit our Youtube channel",
        imgIcon: false,
        imgLink: "https://www.youtube.com/c/spyderide",
        imgClasses: "w-full h-full",
        content: LearnMore,
      },
    ],
  },
};

// Load content and process blocks
export function load() {
  return frontPage;
}
