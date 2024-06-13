import { base } from "$app/paths";
import { getOS } from "$lib/utils";

// Content
import Interactive from "$lib/content/interactive.md";
import Growth from "$lib/content/growth.md";
import Files from "$lib/content/files.md";
import Cells from "$lib/content/cells.md";
import Selections from "$lib/content/selections.md";
import Ecosystem from "$lib/content/ecosystem.md";
import Setup from "$lib/content/setup.md";

// OS Detection
const os = getOS();
let downloadString = "";
if (os === "windows") {
  downloadString = "for Windows 10+";
} else if (os === "mac") {
  downloadString = "for Mac OS";
} else if (os === "linux") {
  downloadString = "for Ubuntu 18.04+";
}

// Load content and process blocks
export function load() {
  return {
    props: {
      // Hero section buttons
      buttons: [
        {
          highlight: false,
          icon: "github",
          text: "Checkout on GitHub",
          href: "https://github.com/",
        },
        {
          highlight: true,
          icon: getOS(),
          text: `Download ${downloadString}`,
          href: `${base}/download/?os=${getOS()}`,
        },
      ],

      // Content blocks
      blocks: [
        {
          id: "interactive-section",
          border: false,
          video: false,
          button: false,
          content: Interactive,
          tabs: [
            { title: "Files", content: Files },
            { title: "Cells", content: Cells },
            { title: "Selections", content: Selections },
          ],
        },
        {
          id: "growth-section",
          border: true,
          video: true,
          videoId: "E2Dap5SfXkI",
          button: false,
          content: Growth,
        },
        {
          id: "pydata-section",
          border: false,
          videoPoster:
            "https://sveltejs.github.io/assets/caminandes-llamigos.jpg",
          videoSources: [
            {
              src: "https://sveltejs.github.io/assets/caminandes-llamigos.mp4",
              type: "video/mp4",
            },
          ],
          button: false,
          content: Ecosystem,
        },
        {
          id: "setup-section",
          border: false,
          video: false,
          button: true,
          content: Setup,
          buttonText: "Download",
          buttonIcon: getOS(),
          buttonHref: `${base}/download/?os=${getOS()}`,
          buttonHighlight: true,
        },
      ],
    },
  };
}
