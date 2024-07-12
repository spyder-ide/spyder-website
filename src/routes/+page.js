// OS Detection
import { getOS, getOSButtons } from "$lib/utils";
import { base } from "$app/paths";

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

// OS buttons
const os = getOS();
const osButtons = getOSButtons(base, os);

// Content blocks
const frontPage = {
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
          { title: "Variable Explorer", content: Files },
          { title: "Debugger", content: Cells },
          { title: "Editor", content: Selections },
        ],
      },
      {
        id: "pydata-section",
        title: "Seamless integration with the PyData ecosystem",
        divider: true,
        border: false,
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
        video: true,
        videoId: "E2Dap5SfXkI",
        divider: true,
        content: Growth,
      },
      {
        id: "setup-section",
        title: "Zero setup process",
        border: false,
        video: false,
        content: Setup,
        divider: true,
        imgSrc: `${base}/assets/media/${os}.webp`,
        buttons: osButtons,
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
      },
    ],
  },
};

// Load content and process blocks
export function load() {
  return frontPage;
}
