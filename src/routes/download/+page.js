const visit = `visit our <a href="https://github.com/spyder-ide/spyder/releases" target="_blank">releases page</a> on GitHub.`

const content = {
  props: {
    title: "Download Spyder",
    subtitle: `If the download does not start automatically, please click the button below`,
    alternative: `To download Spyder for the detected OS, please click the button below`,
    download: {
      title: "Download Started...",
      alternative: `Alternatively, you can manually select the package you want from the buttons below, or ${visit}`
    },
  }
}

export function load() {
  return content
}
