import { useState } from 'preact/hooks'

import { RecordForm } from './components/record-form'
import { RecordItem } from './components/record-item'
import { saveRule, removeRule, removeAllRules } from './utils/declarative-net-request'
import { getNextRuleId } from './utils/get-next-rule-id'
import { useRecords } from './hooks/use-records'
import { SkeletonLoader } from './components/skeleton-loader'
import { ExtensionToggle } from './components/extension-toggle'
import { set } from './utils/storage'
import { setIcon } from './utils/icon'
import { useExtensionState } from './hooks/use-extension-state'

export interface RedirectRecord {
  id: number
  origin: string
  destination: string
  keepSubpath: boolean
  enabled: boolean
}

export const Popup = () => {
  const [editingRecord, setEditingRecord] = useState<RedirectRecord | null>(null)
  const { records, setRecords, isLoading, error } = useRecords()
  const { isExtensionEnabled, setIsExtensionEnabled } = useExtensionState()

  const addRecord = async (newRecord: Omit<RedirectRecord, 'id' | 'enabled'>) => {
    const record: RedirectRecord = {
      id: await getNextRuleId(),
      ...newRecord,
      enabled: true,
    }
    setRecords((prevRecords) => [...prevRecords, record])

    await saveRule(record)
  }

  const updateRecord = async (updatedRecord: Omit<RedirectRecord, 'id' | 'enabled'>) => {
    setRecords((prevRecords) =>
      prevRecords.map((r) =>
        r.id === editingRecord!.id ? { ...r, ...updatedRecord, enabled: r.enabled } : r,
      ),
    )
    setEditingRecord(null)

    await saveRule({
      ...updatedRecord,
      id: editingRecord!.id,
      enabled: editingRecord!.enabled,
    })
  }

  const deleteRecord = async (id: RedirectRecord['id']) => {
    setRecords((prevRecords) => prevRecords.filter((r) => r.id !== id))

    await removeRule(id)

    if (editingRecord?.id === id) {
      setEditingRecord(null)
    }
  }

  const toggleRecord = async (id: RedirectRecord['id']) => {
    setRecords((prevRecords) =>
      prevRecords.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    )

    const record = {
      ...records.find((r) => r.id === id)!,
      enabled: !records.find((r) => r.id === id)!.enabled,
    }

    console.log('Toggling record:', record)

    await saveRule(record)
  }

  const setExtensionEnabled = async (enabled: RedirectRecord['enabled']) => {
    console.log('Setting extension enabled to:', enabled)
    setIsExtensionEnabled(enabled)
    setIcon({
      path: enabled ? 'img/logo-128.png' : 'img/logo-128-disabled.png',
    })
    await set({ isExtensionEnabled: enabled })
  }

  const toggleExtension = async () => {
    const newState = !isExtensionEnabled

    await setExtensionEnabled(newState)

    if (!newState) {
      await removeAllRules()
    } else {
      for (const record of records) {
        await saveRule(record)
      }
    }
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <main className="bg-gray-100 p-4 w-[790px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">URL Redirector 2</h1>
        <div className="flex items-center">
          <ExtensionToggle
            isExtensionEnabled={isExtensionEnabled}
            toggleExtension={toggleExtension}
          />
        </div>
      </div>
      <div className="mx-auto">
        <RecordForm
          onSubmit={editingRecord ? updateRecord : addRecord}
          initialData={editingRecord}
          onCancel={editingRecord ? () => setEditingRecord(null) : undefined}
        />
        {records.length > 0 ? (
          <div className="mt-4">
            {records.map((record, index) => (
              <RecordItem
                key={record.id}
                record={record}
                onEdit={setEditingRecord}
                onDelete={deleteRecord}
                onToggle={toggleRecord}
                className={index === records.length - 1 ? '' : 'mb-4'}
              />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  )
}

export default Popup
