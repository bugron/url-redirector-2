export const getNextRuleId = async () => {
  const rules = await chrome.declarativeNetRequest.getDynamicRules()

  return Math.max(0, ...rules.map((rule) => rule.id)) + 1
}
