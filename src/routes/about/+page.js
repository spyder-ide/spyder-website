import { getContributors } from "$lib/utils";

export const load = async ({ fetch }) => {
  const metadata = {
    title: "Spyder IDE | About",
    subtitle: "Who we are",
    description:
      "Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment",
    keywords:
      "Spyder IDE, Python IDE, Python, IDE, Spyder, Spyder IDE, Spyder IDE.org",
    author: "Spyder IDE",
    image: "https://spyder-ide.org/assets/media/website_screenshot.png",
    url: "/about",
    prism: false,
  };

  const { contributors } = await getContributors(fetch);

  return { metadata, contributors };
};
