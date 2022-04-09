// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { contextBridge, ipcRenderer } from "electron"

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron', 'v8']) {
    replaceText(`${type}-version`, process.versions[type])

  }
  replaceText('preload', '👍')
})

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);