export const get = async <T extends Record<string, unknown>>(dictionary: T): Promise<T> => {
  return chrome.storage.sync.get(dictionary) as Promise<T>
}

export const set = async <T extends Record<string, unknown>>(dictionary: T): Promise<void> => {
  return chrome.storage.sync.set(dictionary)
}
