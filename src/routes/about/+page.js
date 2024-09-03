const dataSrc = `https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=48`;

export async function load({ fetch }) {
    const response = await fetch(dataSrc);
    const contributors = await response.json();
    return { contributors };
}
