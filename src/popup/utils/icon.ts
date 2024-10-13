export const setIcon = async (details: chrome.action.TabIconDetails) => {
  return chrome.action.setIcon(details)
}
