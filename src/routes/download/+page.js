const visit = `visit our <a href="https://github.com/spyder-ide/spyder/releases" target="_blank">releases page</a> on Github.`

const content = {
  props: {
    title: "Download Spyder",
    intro: `Please select the package you want from the links below, or ${visit}`,
    download: {
      start: "Download started&hellip;",
      click: `If the download does not start automatically, please click the button below`,
      alt: `Alternatively, you can manually select the package you want from the links below, or ${visit}`
    },
  }
}

export function load() {
  return content
}
