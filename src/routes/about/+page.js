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
        name: "Hendrik Louzada",
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

function processContributors(current, all) {
    // Update current contributors with the latest data from GitHub
    const updatedCurrent = current.map(contributor => {
        const match = all.find(c => c.id === contributor.id);
        return match ? { ...contributor, ...match } : contributor;
    });

    // Get the remaining contributors that are not in the current list
    const remainingContributors = all.filter(contributor =>
        !current.some(c => c.id === contributor.id)
    );

    // Just some random contributors to show as examples in the "past contributors" section
    // TODO: Remove this after we have the past contributors from GitHub
    const pastContributors = remainingContributors.sort(() => 0.5 - Math.random()).slice(0, 12);
    pastContributors.forEach(element => { element.role = "Lorem Ipsum" });

    // Remove pastContributors elements from remainingContributors
    const remainingContributorsFiltered = remainingContributors.filter(contributor =>
        !pastContributors.some(pastContributor => pastContributor.id === contributor.id)
    );

    // Return the updated current contributors, past contributors, and remaining contributors
    return { updatedCurrent, pastContributors, remainingContributors: remainingContributorsFiltered };
}

export async function load({ fetch }) {
    try {
        const response = await fetch(dataSrc);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const contributors = await response.json();

        // Process the contributors and get the updated current contributors, past contributors, and remaining contributors
        const { updatedCurrent, pastContributors, remainingContributors } = processContributors(currentContributors, contributors);

        return { currentContributors: updatedCurrent, pastContributors, remainingContributors };
    } catch (error) {
        console.error("Failed to fetch contributors:", error);
        return { currentContributors, pastContributors: [], remainingContributors: [], error: error.message };
    }
}
