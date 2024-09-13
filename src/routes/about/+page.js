const dataSrc = `https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100`;

const currentContributors = [
    {
        id: 365293,
        name: "Carlos Córdoba",
        role: "Lead mantainer"
    },
    {
        id: 16781833,
        name: "Daniel Althviz",
        role: "Co-mantainer"
    },
    {
        id: 17051931,
        name: "C.A.M. Gerlach",
        role: "Documentation and technical writing"
    },
    {
        id: 9618975,
        name: "Ryan Clary",
        role: "Installers"
    },
    {
        id: 7941918,
        name: "Jitse Niesen",
        role: "External plugins"
    },
    {
        id: 5204788,
        name: "Hendrik D. Louzada",
        role: "Remote development"
    },
    {
        id: 42411448,
        name: "Juan Sebastian Bautista",
        role: "Junior Developer"
    },
    {
        id: 5027583,
        name: "Andrés Montoya",
        role: "UI/UX Designer and Social Media"
    }
];

const pastContributors = [
    {
        id: 1311787,
        name: "Pierre Raybaut",
        role: "Spyder Creator"
    },
    {
        id: 1878982,
        name: "Edgar Andrés Margffoy Tuay",
        role: "LSP Support"
    },
    {
        id: 50221806,
        name: "Isabela Presedo-Floyd",
        role: "UX/UI Redesign"
    },
    {
        id: 3627835,
        name: "Gonzalo Peña-Castellanos",
        role: "API Redesign"
    },
    {
        id: 18587879,
        name: "Juanita Gómez",
        role: "Docs & Social Media"
    },
    {
        id: 10170372,
        name: "Jean-Sébastien Gosselin",
        role: "Plots pane"
    },
    {
        id: 20992645,
        name: "Stephannie Jimenez Gacha",
        role: "Spyder-terminal maintainer"
    },
    {
        id: 2397974,
        name: "Sylvain Corlay",
        role: "New Icon Theme"
    },
    {
        id: 2024217,
        name: "Rafael Laverde",
        role: "Editor improvements"
    },
    {
        id: 10513354,
        name: "Brian Olsen",
        role: "Console improvements"
    },
];

function processContributors(current, past, all) {
    // Update current contributors with the latest data from GitHub
    const updatedCurrent = current.map(contributor => {
        const match = all.find(c => c.id === contributor.id);
        return match ? { ...contributor, ...match } : contributor;
    });

    const updatedPast = past.map(contributor => {
        const match = all.find(c => c.id === contributor.id);
        return match ? { ...contributor, ...match } : contributor;
    });

    // Get the remaining contributors that are not in the current list
    const remainingContributors = all.filter(contributor =>
        !current.some(c => c.id === contributor.id) && !past.some(p => p.id === contributor.id)
    );

    // Return the updated current contributors, past contributors, and remaining contributors
    return { updatedCurrent, updatedPast, remainingContributors };
}

export async function load({ fetch }) {
    try {
        const response = await fetch(dataSrc);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const contributors = await response.json();

        // Process the contributors and get the updated current contributors, past contributors, and remaining contributors
        const { updatedCurrent, updatedPast, remainingContributors } = processContributors(currentContributors, pastContributors, contributors);

        return { currentContributors: updatedCurrent, pastContributors: updatedPast, remainingContributors };
    } catch (error) {
        console.error("Failed to fetch contributors:", error);
        return { currentContributors, pastContributors: [], remainingContributors: [], error: error.message };
    }
}
