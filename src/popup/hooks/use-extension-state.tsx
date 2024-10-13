import { useState, useEffect } from 'react'
import { get } from '../utils/storage'

const DEFAULT_EXTENSION_ENABLED = true

export const useExtensionState = () => {
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(DEFAULT_EXTENSION_ENABLED)

  useEffect(() => {
    const loadIsExtensionEnabled = async () => {
      const { isExtensionEnabled } = await get({
        isExtensionEnabled: DEFAULT_EXTENSION_ENABLED,
      })

      console.log('Loaded isExtensionEnabled:', isExtensionEnabled)

      setIsExtensionEnabled(isExtensionEnabled)
    }

    loadIsExtensionEnabled()
  }, [])

  return { isExtensionEnabled, setIsExtensionEnabled }
}
