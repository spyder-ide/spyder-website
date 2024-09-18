const dataSrc = `https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100`;

const currentContributors = [
  {
    id: 365293,
    name: "Carlos Córdoba",
    role: "Lead mantainer",
    latino: true,
  },
  {
    id: 16781833,
    name: "Daniel Althviz",
    role: "Co-mantainer",
  },
  {
    id: 17051931,
    name: "C.A.M. Gerlach",
    role: "Documentation and technical writing",
    avatar_url: "/assets/authors/camgerlach/pic.webp"
  },
  {
    id: 9618975,
    name: "Ryan Clary",
    role: "Installers",
  },
  {
    id: 7941918,
    name: "Jitse Niesen",
    role: "External plugins",
  },
  {
    id: 5204788,
    name: "Hendrik D. Louzada",
    role: "Remote development",
    latino: true,
  },
  {
    id: 42411448,
    name: "Juan Sebastian Bautista",
    role: "Junior Developer",
    latino: true,
  },
  {
    id: 5027583,
    name: "Andrés Montoya",
    role: "UI/UX Designer and Social Media",
    latino: true,
  },
];

const pastContributors = [
  {
    id: 1311787,
    name: "Pierre Raybaut",
    role: "Spyder Creator",
  },
  {
    id: 1878982,
    name: "Edgar Margffoy",
    role: "LSP Support",
  },
  {
    id: 50221806,
    name: "Isabela Presedo-Floyd",
    role: "UX/UI Redesign",
    female: true,
  },
  {
    id: 3627835,
    name: "Gonzalo Peña-Castellanos",
    role: "API Redesign",
    latino: true,
  },
  {
    id: 18587879,
    name: "Juanita Gómez",
    role: "Docs & Social Media",
    latino: true,
    female: true,
  },
  {
    id: 10170372,
    name: "Jean-Sébastien Gosselin",
    role: "Plots pane",
  },
  {
    id: 20992645,
    name: "Stephannie Jimenez",
    role: "Spyder-terminal maintainer",
    latino: true,
    female: true,
  },
  {
    id: 2397974,
    name: "Sylvain Corlay",
    role: "New Icon Theme",
  },
  {
    id: 2024217,
    name: "Rafael Laverde",
    role: "Editor improvements",
    latino: true,
  },
  {
    id: 10513354,
    name: "Brian Olsen",
    role: "Console improvements",
  },
];

const textData = {
  pageTitle: "Who We Are",
  pageIntro: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
        eligendi dolorem optio adipisci voluptatem inventore eius recusandae
        reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
        aliquid qui distinctio.`,
  currentTitle: "Core team",
  pastTitle: "Past team members",
  remainingTitle: "Contributor community",
  remainingIntro: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
        eligendi dolorem optio adipisci voluptatem inventore eius recusandae
        reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
        aliquid qui distinctio.`,
  diversityTitle: `Diversity and Inclusion`,
  diversityIntro: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
        eligendi dolorem optio adipisci voluptatem inventore eius recusandae
        reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
        aliquid qui distinctio.`,
};

function processContributors(current, past, all) {
  // Update current contributors from GitHub with custom data
  const updateContributor = (contributor, allContributors) => {
    const match = allContributors.find((c) => c.id === contributor.id);
    return match ? { ...match, ...contributor } : contributor;
  };

  const updatedCurrent = current.map((contributor) => updateContributor(contributor, all));
  const updatedPast = past.map((contributor) => updateContributor(contributor, all));

  // Get the remaining contributors that are not in the current list
  const remainingContributors = all.filter(
    (contributor) =>
      !current.some((c) => c.id === contributor.id) &&
      !past.some((p) => p.id === contributor.id)
  );

  const totalContributorsPool = [...updatedCurrent, ...updatedPast];
  const totalContributors = totalContributorsPool.length;

  // Count the number of female and latinos contributors
  const totalLatinos = totalContributorsPool.filter(
    (contributor) => contributor.latino
  ).length;
  const totalFemales = totalContributorsPool.filter(
    (contributor) => contributor.female
  ).length;

  // Calculate percentages
  const percentageLatinos = (totalLatinos / totalContributors) * 100;
  const percentageFemales = (totalFemales / totalContributors) * 100;

  // Return the updated current contributors, past contributors, and remaining contributors
  return {
    updatedCurrent,
    updatedPast,
    remainingContributors,
    totalContributors,
    totalLatinos,
    totalFemales,
    percentageLatinos,
    percentageFemales,
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
      totalLatinos,
      totalFemales,
      percentageLatinos,
      percentageFemales,
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
      totalLatinos,
      totalFemales,
      percentageLatinos,
      percentageFemales,
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
