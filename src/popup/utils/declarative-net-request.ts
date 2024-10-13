import { RedirectRecord } from '../Popup'
import { getEnumValues } from './get-enum-values'

export const saveRule = async (record: RedirectRecord) => {
  if (!record.enabled) {
    return removeRule(record.id)
  }

  const rule: chrome.declarativeNetRequest.Rule = {
    id: record.id,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: !record.keepSubpath
        ? { url: record.destination }
        : {
            regexSubstitution: `${record.destination}\\1`,
          },
    },
    condition: {
      ...(!record.keepSubpath
        ? { urlFilter: record.origin }
        : {
            regexFilter: `^${record.origin.replaceAll('.', '\\.')}(.*)`,
          }),
      resourceTypes: getEnumValues(chrome.declarativeNetRequest.ResourceType),
    },
  }

  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [record.id],
    addRules: [rule],
  })
}

export const removeRule = async (id: number) => {
  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [id],
  })
}

export const removeAllRules = async () => {
  const removeRuleIds = (await chrome.declarativeNetRequest.getDynamicRules()).map(
    (rule) => rule.id,
  )

  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds,
  })
}
