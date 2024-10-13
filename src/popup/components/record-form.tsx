import { useState, useEffect } from 'preact/hooks'
import { RedirectRecord } from '../Popup'
import { FormEvent, ChangeEvent } from 'preact/compat'
import { isValidUrl } from '../utils/validate-url'

interface RecordFormProps {
  onSubmit: (record: Omit<RedirectRecord, 'id' | 'enabled'>) => void
  initialData: RedirectRecord | null
  onCancel?: () => void
}

export const RecordForm = ({ onSubmit, initialData, onCancel }: RecordFormProps) => {
  const [origin, setOrigin] = useState(initialData?.origin || '')
  const [destination, setDestination] = useState(initialData?.destination || '')
  const [keepSubpath, setKeepSubpath] = useState(initialData?.keepSubpath || false)
  const [errors, setErrors] = useState<{ origin?: string; destination?: string; general?: string }>(
    {},
  )

  useEffect(() => {
    if (initialData) {
      setOrigin(initialData.origin)
      setDestination(initialData.destination)
      setKeepSubpath(initialData.keepSubpath)
    } else {
      setOrigin('')
      setDestination('')
      setKeepSubpath(false)
    }
  }, [initialData])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: { origin?: string; destination?: string; general?: string } = {}

    if (!isValidUrl(origin)) {
      newErrors.origin = 'Please enter a valid URL'
    }
    if (!isValidUrl(destination)) {
      newErrors.destination = 'Please enter a valid URL'
    }
    if (origin === destination) {
      newErrors.general = 'Origin and destination URLs cannot be the same'
    }

    setErrors(newErrors)

    const processedOrigin = origin.trim()
    const processedDestination = destination.trim()

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ origin: processedOrigin, destination: processedDestination, keepSubpath })

      if (!initialData) {
        setOrigin('')
        setDestination('')
        setKeepSubpath(false)
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <form onSubmit={handleSubmit} className="flex items-start space-x-2 w-full">
        <div className="flex flex-col flex-grow">
          <input
            type="text"
            value={origin}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOrigin((e.target as HTMLInputElement).value)
            }
            placeholder="Origin URL"
            className={`w-full p-2 border rounded h-10 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.origin ? 'border-red-500' : ''}`}
            required
          />
          {errors.origin && (
            <span className="text-red-500 text-xs mt-1 text-left">{errors.origin}</span>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <input
            type="text"
            value={destination}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDestination((e.target as HTMLInputElement).value)
            }
            placeholder="Destination URL"
            className={`w-full p-2 border rounded h-10 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.destination ? 'border-red-500' : ''}`}
            required
          />
          {errors.destination && (
            <span className="text-red-500 text-xs mt-1 text-left">{errors.destination}</span>
          )}
        </div>
        <label className="flex items-center whitespace-nowrap text-gray-800 hover:text-gray-900 h-10">
          <input
            type="checkbox"
            checked={keepSubpath}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeepSubpath((e.target as HTMLInputElement).checked)
            }
            className="form-checkbox mr-2 h-5 w-5 text-blue-500 rounded bg-gray-50 border-gray-300"
          />
          <span>Keep Subpath</span>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded whitespace-nowrap h-10 transition duration-150 ease-in-out"
        >
          {initialData ? 'Update' : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 rounded whitespace-nowrap h-10 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        )}
      </form>
      {errors.general && <p className="text-red-500 text-sm mt-2 text-left">{errors.general}</p>}
    </div>
  )
}
