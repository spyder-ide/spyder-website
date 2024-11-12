const visit = `visit our <a href="https://github.com/spyder-ide/spyder/releases" target="_blank">releases page</a> on GitHub.`

const content = {
  props: {
    title: "Download Spyder",
    intro: `Select the package you want to download from the links below, or ${visit}`,
    download: {
      title: "Download Spyder",
      message: `If the download does not start automatically, please click the button below`,
      alternative: `Alternatively, you can manually select the package you want from the links below, or ${visit}`
    },
  }
}

export function load() {
  return content
}
