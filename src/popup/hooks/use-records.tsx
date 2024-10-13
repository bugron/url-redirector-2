import { useState, useEffect } from 'react'
import { RedirectRecord } from '../Popup'
import { get, set } from '../utils/storage'

export const useRecords = () => {
  const [records, setRecords] = useState<RedirectRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecords = async () => {
      setIsLoading(true)

      try {
        const { redirectRecords } = await get({
          redirectRecords: [],
        })
        console.log('Loaded records:', redirectRecords)
        setRecords(redirectRecords)
      } catch (err) {
        console.error('Error loading records:', err)
        setError('Failed to load records. Please try reopening the popup.')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecords()
  }, [])

  useEffect(() => {
    const saveRecords = async () => {
      try {
        await set({ redirectRecords: records })
        console.log('Saved records:', records)
      } catch (err) {
        console.error('Error saving records:', err)
        setError('Failed to save records. Your changes may not persist.')
      }
    }

    if (!isLoading) {
      saveRecords()
    }
  }, [records])

  return {
    records,
    setRecords,
    setError,
    error,
    isLoading,
  }
}
