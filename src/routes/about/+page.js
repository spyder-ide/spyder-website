import { tooltip } from 'svooltip';

const dataSrc = `https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100`;

const currentContributors = [
  {
    id: 365293,
    name: "Carlos Córdoba",
    role: "Lead mantainer",
    tooltip: [
      {
        list: [
           "Lead maintainer since 2013"
        ]
      },
    ]
  },
  {
    id: 16781833,
    name: "Daniel Althviz",
    role: "Co-mantainer",
    tooltip: [
      {
        list: [
          "Release manager",
          "Maintainer of QtPy and QtAwesome",
          "Manager of NumFOCUS small development grants"
        ]
      }
    ]
  },
  {
    id: 17051931,
    name: "C.A.M. Gerlach",
    role: "Core developer",
    avatar_url: "/assets/authors/camgerlach/pic.webp",
    tooltip: [
      {
        list: [
          "Docs maintainer",
          "Technical, grant and blog writer",
          "Outreach lead"
        ]
      }
    ]
  },
  {
    id: 6740194,
    name: "Quentin Peter",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Re-architectured communications between Spyder and Spyder-Kernels",
          "Creator of the Debugger pane",
          "Many improvements to the IPython console"
        ]
      }
    ]
  },
  {
    id: 9618975,
    name: "Ryan Clary",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Maintainer of the standalone installers"
        ]
      }
    ]
  },
  {
    id: 7941918,
    name: "Jitse Niesen",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "External plugins maintainer"
        ]
      }
    ]
  },
  {
    id: 42411448,
    name: "Juan Sebastian Bautista",
    role: "Junior developer",
    tooltip: [
      {
        list: [
          "Improvements to the Windows installer, QtConsole and Spyder's UI/UX"
        ]
      }
    ]
  },
  {
    id: 5204788,
    name: "Hendrik D. Louzada",
    role: "Junior developer",
    tooltip: [
      {
        list: [
          "Developed backend for the remote client plugin"
        ]
      }
    ]
  },
  {
    id: 5027583,
    name: "Andrés Montoya",
    role: "Graphic and web designer",
    tooltip: [
      {
        list: [
          "Developer and maintainer of this website",
          "UI/UX improvements",
          "Social media graphics designer"
        ]
      }
    ]
  },
];

const pastContributors = [
  {
    id: 1311787,
    name: "Pierre Raybaut",
    role: "Spyder Creator",
    tooltip: [
      {
        list: [
          "Created Spyder in 2009",
          "Lead maintainer until 2013",
        ]
      }
    ]
  },
  {
    id: 1878982,
    name: "Edgar Margffoy",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "LSP support for the entire application",
          "Re-architectured plugin registration and interactions",
          "New architecture for the Run plugin",
          "Add global registries for actions, menus and toolbars",
        ]
      }
    ]
  },
  {
    id: 50221806,
    name: "Isabela Presedo-Floyd",
    role: "Designer",
    tooltip: [
      {
        list: [
          "New color system and palette for the application",
          "Logo redesign",
          "Many UI/UX improvements"
        ]
      }
    ]
  },
  {
    id: 3627835,
    name: "Gonzalo Peña-Castellanos",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Redesigned the plugins API",
          "Creator of QtPy",
          "Improved configuration system",
          "Many improvements to the Editor"
        ]
      }
    ]
  },
  {
    id: 18587879,
    name: "Juanita Gómez",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Docs writer",
          "Main content creator for Spyder's YouTube channel",
          "Community manager"
        ]
      }
    ]
  },
  {
    id: 10170372,
    name: "Jean-Sébastien Gosselin",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Creator of the Plots plane",
          "Many improvements across the entire application",
        ]
      }
    ]
  },
  {
    id: 20992645,
    name: "Stephannie Jimenez",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Spyder-Terminal maintainer",
          "New architecture for the Run plugin",
          "Enhancements to the icon manager",
        ]
      }
    ]
  },
  {
    id: 2397974,
    name: "Sylvain Corlay",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "New icon theme for Spyder",
          "Creator of QtAwesome",
        ]
      }
    ]
  },
  {
    id: 2024217,
    name: "Rafael Laverde",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Improvements to the Editor",
        ]
      }
    ]
  },
  {
    id: 10513354,
    name: "Brian Olsen",
    role: "Core developer",
    tooltip: [
      {
        list: [
          "Improvements to the IPython console"
        ]
      }
    ]
  },
];

const textData = {
  pageTitle: "Who We Are",
  pageIntro: `Spyder is an open source, community-developed scientific environment and IDE written in Python, for Python.
    As scientists, engineers and analysts just like you, we built it to combine the power of a comprehensive development tool with the speed of an interactive data exploration package, all in one easy-to-use interface.`,
  currentTitle: "Core team",
  pastTitle: "Past team members",
  remainingTitle: "Contributor community",
  remainingIntro: `Spyder is made possible by a collective of developers, testers, translators and donors, hailing from all around the globe!
    We exist by and for our worldwide community, and even the smallest contribution makes a world of different for us all.`,
  diversityTitle: `Diversity and Inclusion`,
  diversityIntro: `We're proud of our highly diverse core devs contributors and user community,
    bringing numerous distinct backgrounds and perspectives to the table.
    The Spyder team is led by, majority-composed-of, and recruits heavily from countries, languages, ethnicities and gender identities historically underrepresented in science and open source software, particularly in Latin America.
    Our contributors come from every inhabited continent on Earth and dozens of countries all around the world, each bringing unique needs and perspectives to the table.
    What's more, we help translate Spyder into almost a dozen languages for our user community across the globe, and we welcome you to join us!`,
};

const processContributors = (current, past, all) => {
  // Update current/past contributors from GitHub with custom data
  const updateContributor = (contributor, allContributors) => {
    const match = allContributors.find((c) => c.id === contributor.id);
    return match ? { ...match, ...contributor } : contributor;
  };

  const updatedCurrent = current.map((contributor) => updateContributor(contributor, all));
  const updatedPast = past.map((contributor) => updateContributor(contributor, all));

  // Get the remaining contributors that are not in the current/past lists
  const remainingContributors = all.filter(
    (contributor) =>
      !current.some((c) => c.id === contributor.id) &&
      !past.some((p) => p.id === contributor.id)
  );

  const totalContributorsPool = [...updatedCurrent, ...updatedPast];
  const totalContributors = totalContributorsPool.length;

  // Return the updated current contributors, past contributors, and remaining contributors
  return {
    updatedCurrent,
    updatedPast,
    remainingContributors,
    totalContributors,
  };
}

export async function load({ fetch }) {
  try {
    // Fetch the contributors data
    const contributors = [];

    for (let n = 1; n <= 3; n++) {
      const response = await fetch(`${dataSrc}&page=${n}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      contributors.push(...data);
    }

    // Process the contributors and get the updated current contributors,
    // past contributors, and remaining contributors
    const {
      updatedCurrent,
      updatedPast,
      remainingContributors,
      totalContributors,
    } = processContributors(
      currentContributors,
      pastContributors,
      contributors
    );

    return {
      currentContributors: updatedCurrent,
      pastContributors: updatedPast,
      remainingContributors,
      textData,
      totalContributors,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return {
      currentContributors,
      pastContributors: [],
      remainingContributors: [],
      error: error.message,
    };
  }
}
