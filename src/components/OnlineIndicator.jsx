import { usePresence } from '../context/PresenceContext'

const USERS = [
  { name: 'Pranav', initial: 'P', color: '#C9972F', bg: 'rgba(201,151,47,0.15)', border: 'rgba(201,151,47,0.35)' },
  { name: 'Renuka', initial: 'R', color: '#B85CC0', bg: 'rgba(126,39,135,0.15)', border: 'rgba(126,39,135,0.35)' },
]

export default function OnlineIndicator() {
  const { onlineUsers } = usePresence()

  return (
    <div className="hidden sm:flex items-center gap-1.5" title="Who's online now">
      {USERS.map(u => {
        const online = onlineUsers.includes(u.name)
        return (
          <div
            key={u.name}
            className="relative flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-body"
            style={{ background: u.bg, border: `1px solid ${u.border}`, color: u.color }}
            title={`${u.name} is ${online ? 'online' : 'offline'}`}
          >
            {u.initial}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{
                background: online ? '#86efac' : 'rgba(255,255,255,0.15)',
                borderColor: '#0C0919',
                boxShadow: online ? '0 0 6px #86efac88' : 'none',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
