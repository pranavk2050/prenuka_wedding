import { useSyncStatus } from '../context/SyncContext'

const CONFIG = {
  synced:  { color: '#86efac', label: 'Synced',    pulse: false },
  syncing: { color: '#E8C97A', label: 'Syncing…',  pulse: true  },
  offline: { color: '#fcd34d', label: 'Offline',   pulse: false },
  error:   { color: '#fca5a5', label: 'Sync error',pulse: false },
}

export default function SyncIndicator() {
  const status = useSyncStatus()
  const { color, label, pulse } = CONFIG[status] ?? CONFIG.syncing

  return (
    <div
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-body"
      style={{ color: 'rgba(184,168,138,0.6)' }}
      title={`Firebase sync: ${label}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${pulse ? 'animate-pulse' : ''}`}
        style={{ background: color, boxShadow: `0 0 6px ${color}88` }}
      />
      <span style={{ color }}>{label}</span>
    </div>
  )
}
