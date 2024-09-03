const dataSrc = `https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=48`;

export async function load({ fetch }) {
    try {
        const response = await fetch(dataSrc);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const contributors = await response.json();
        return { contributors };
    } catch (error) {
        console.error("Failed to fetch contributors:", error);
        return { contributors: null, error: error.message };
    }
}
