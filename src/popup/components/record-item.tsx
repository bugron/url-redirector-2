import { RedirectRecord } from '../Popup'
import { IconButton } from './icon-button'
import EditIcon from './icons/EditIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import ToggleOffIcon from './icons/ToggleOffIcon'
import ToggleOnIcon from './icons/ToggleOnIcon'

interface RecordItemProps {
  record: RedirectRecord
  onEdit: (record: RedirectRecord) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  className?: string
}

export const RecordItem = ({ record, onEdit, onDelete, onToggle, className }: RecordItemProps) => {
  return (
    <div
      className={`bg-white p-4 rounded shadow border-l-4 ${record.enabled ? 'border-green-500' : 'border-grey-500'} ${className}`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex-grow overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <p
                className="font-semibold text-gray-800 break-all max-w-[250px]"
                title={record.origin}
              >
                {record.origin}
              </p>
              <span className="text-gray-600 flex-shrink-0">→</span>
              <p className="text-gray-800 break-all max-w-[250px]" title={record.destination}>
                {record.destination}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold self-center ${record.keepSubpath ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {record.keepSubpath ? 'Keep' : 'Discard'}
            </span>
            <IconButton onClick={() => onEdit(record)} title="Edit" className="text-blue-500">
              <EditIcon className={`h-5 w-5 ${isEditing ? 'opacity-50' : ''}`} />
            </IconButton>
            <IconButton onClick={() => onDelete(record.id)} title="Delete" className="text-red-500">
              <DeleteIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              onClick={() => onToggle(record.id)}
              title={record.enabled ? 'Disable' : 'Enable'}
              className={record.enabled ? 'text-green-500' : 'text-gray-500'}
            >
              {record.enabled ? (
                <ToggleOnIcon className="h-5 w-5" />
              ) : (
                <ToggleOffIcon className="h-5 w-5" />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
