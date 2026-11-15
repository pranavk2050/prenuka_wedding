import { motion } from 'framer-motion'
import { Users, CheckSquare, IndianRupee, CalendarDays } from 'lucide-react'
import { usePresence } from '../context/PresenceContext'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts'
import useWeddingStore from '../store/useWeddingStore'

function getTimeLeft() {
  const diff = new Date('2027-02-12') - new Date()
  return Math.max(0, Math.floor(diff / 86400000))
}

const fadeUp = i => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
})

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <motion.div {...fadeUp(0)} className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div
        className="font-display text-4xl font-semibold tab-nums mb-1"
        style={{ color }}
      >
        {value}
      </div>
      <div className="font-body text-sm font-medium text-cream">{label}</div>
      {sub && (
        <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
          {sub}
        </div>
      )}
    </motion.div>
  )
}

const GOLD = '#C9972F'
const PAITHANI = '#7E2787'
const LIGHT_GOLD = '#E8C97A'
const LIGHT_PURPLE = '#B85CC0'

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

export default function DashboardPage() {
  const { guests, tasks, budget, activityLog = [] } = useWeddingStore()
  const { onlineUsers, visitLog } = usePresence()

  const groomCount = guests.groomSide.length
  const brideCount = guests.brideSide.length
  const totalGuests = groomCount + brideCount
  const confirmedGuests = guests.groomSide.filter(g => g.rsvp === 'confirmed').length
                        + guests.brideSide.filter(g => g.rsvp === 'confirmed').length

  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.completed).length
  const taskPct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0

  const totalSpent = budget.categories.reduce((s, c) => s + (c.spent || 0), 0)
  const budgetPct = budget.totalBudget ? Math.round((totalSpent / budget.totalBudget) * 100) : 0

  const daysLeft = getTimeLeft()

  const guestPieData = [
    { name: "Pranav's Side", value: Math.max(groomCount, 1) },
    { name: "Renuka's Side", value: Math.max(brideCount, 1) },
  ]

  const budgetBarData = budget.categories.slice(0, 8).map(c => ({
    name: c.name.length > 14 ? c.name.slice(0, 13) + '…' : c.name,
    Allocated: c.allocated,
    Spent: c.spent || 0,
  }))

  const taskCategories = [...new Set(tasks.map(t => t.category))]
  const taskBarData = taskCategories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat)
    return {
      name: cat,
      Total: catTasks.length,
      Done: catTasks.filter(t => t.completed).length,
    }
  })

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Section header */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <div className="section-eyebrow mb-2">Planning Progress</div>
        <h2 className="section-title">Wedding Dashboard</h2>
        <p className="font-body text-sm mt-2" style={{ color: 'rgba(184,168,138,0.6)' }}>
          Track every detail of Pranav & Renuka's special day
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <motion.div {...fadeUp(0)} className="glass rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,151,47,0.12)', border: '1px solid rgba(201,151,47,0.25)' }}>
              <CalendarDays size={18} style={{ color: '#E8C97A' }} />
            </div>
          </div>
          <div className="font-display text-4xl font-semibold tab-nums mb-1" style={{ color: '#E8C97A' }}>
            {daysLeft}
          </div>
          <div className="font-body text-sm font-medium text-cream">Days Left</div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>Until Feb 12, 2027</div>
        </motion.div>

        <motion.div {...fadeUp(1)} className="glass rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(126,39,135,0.12)', border: '1px solid rgba(126,39,135,0.25)' }}>
              <Users size={18} style={{ color: '#B85CC0' }} />
            </div>
          </div>
          <div className="font-display text-4xl font-semibold tab-nums mb-1" style={{ color: '#B85CC0' }}>
            {totalGuests}
          </div>
          <div className="font-body text-sm font-medium text-cream">Guests Added</div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
            {confirmedGuests} confirmed · target 350
          </div>
        </motion.div>

        <motion.div {...fadeUp(2)} className="glass rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <CheckSquare size={18} style={{ color: '#86efac' }} />
            </div>
          </div>
          <div className="font-display text-4xl font-semibold tab-nums mb-1" style={{ color: '#86efac' }}>
            {taskPct}%
          </div>
          <div className="font-body text-sm font-medium text-cream">Tasks Done</div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
            {doneTasks} of {totalTasks} tasks
          </div>
        </motion.div>

        <motion.div {...fadeUp(3)} className="glass rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <IndianRupee size={18} style={{ color: '#fcd34d' }} />
            </div>
          </div>
          <div className="font-display text-4xl font-semibold tab-nums mb-1" style={{ color: '#fcd34d' }}>
            {budgetPct}%
          </div>
          <div className="font-body text-sm font-medium text-cream">Budget Used</div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
            {fmt(totalSpent)} of {fmt(budget.totalBudget)}
          </div>
        </motion.div>
      </div>

      {/* Online + Visit log */}
      <motion.div {...fadeUp(0)} className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Who's online */}
          <div className="flex-shrink-0">
            <div className="section-eyebrow mb-3">Now Online</div>
            <div className="flex items-center gap-4">
              {[
                { name: 'Pranav', color: '#E8C97A', bg: 'rgba(201,151,47,0.15)', border: 'rgba(201,151,47,0.3)' },
                { name: 'Renuka', color: '#B85CC0', bg: 'rgba(126,39,135,0.15)', border: 'rgba(126,39,135,0.3)' },
              ].map(u => {
                const online = onlineUsers.includes(u.name)
                return (
                  <div key={u.name} className="flex items-center gap-2">
                    <div
                      className="relative w-9 h-9 rounded-full flex items-center justify-center font-bold font-body text-sm"
                      style={{ background: u.bg, border: `1px solid ${u.border}`, color: u.color }}
                    >
                      {u.name[0]}
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                        style={{ background: online ? '#86efac' : 'rgba(255,255,255,0.12)', borderColor: '#0C0919', boxShadow: online ? '0 0 8px #86efac99' : 'none' }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium font-body" style={{ color: u.color }}>{u.name}</div>
                      <div className="text-xs font-body" style={{ color: online ? '#86efac' : 'rgba(184,168,138,0.4)' }}>
                        {online ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px self-stretch" style={{ background: 'rgba(201,151,47,0.15)' }} />

          {/* Visit log */}
          <div className="flex-1 min-w-0">
            <div className="section-eyebrow mb-3">Visit History</div>
            {visitLog.length === 0 ? (
              <p className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.35)' }}>No visits recorded yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {visitLog.slice(0, 20).map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body"
                    style={
                      v.user === 'Pranav'
                        ? { background: 'rgba(201,151,47,0.1)', border: '1px solid rgba(201,151,47,0.2)', color: '#E8C97A' }
                        : { background: 'rgba(126,39,135,0.1)', border: '1px solid rgba(126,39,135,0.2)', color: '#B85CC0' }
                    }
                  >
                    <span className="font-semibold">{v.user}</span>
                    <span style={{ color: 'rgba(184,168,138,0.5)' }}>·</span>
                    <span style={{ color: 'rgba(184,168,138,0.55)' }}>{timeAgo(v.at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Guest distribution pie */}
        <motion.div
          {...fadeUp(0)}
          className="glass rounded-2xl p-6"
        >
          <div className="section-eyebrow mb-1">Guests</div>
          <h3 className="font-display text-xl font-semibold text-cream mb-6">Side-wise Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={guestPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                <Cell fill={GOLD} />
                <Cell fill={PAITHANI} />
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1A1230', border: '1px solid rgba(201,151,47,0.3)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }}
                labelStyle={{ color: '#F5EDD6' }}
                itemStyle={{ color: '#E8C97A' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: GOLD }} />
              <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.7)' }}>Pranav's Side ({groomCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: PAITHANI }} />
              <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.7)' }}>Renuka's Side ({brideCount})</span>
            </div>
          </div>
        </motion.div>

        {/* Budget bar */}
        <motion.div
          {...fadeUp(1)}
          className="glass rounded-2xl p-6"
        >
          <div className="section-eyebrow mb-1">Budget</div>
          <h3 className="font-display text-xl font-semibold text-cream mb-6">Allocated vs Spent</h3>
          <div style={{ overflowX: 'auto' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={budgetBarData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'rgba(184,168,138,0.6)', fontFamily: 'Inter' }} angle={-25} textAnchor="end" height={45} />
                <YAxis tick={{ fontSize: 9, fill: 'rgba(184,168,138,0.5)', fontFamily: 'Inter' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(v, n) => [`₹${v.toLocaleString('en-IN')}`, n]}
                  contentStyle={{ background: '#1A1230', border: '1px solid rgba(201,151,47,0.3)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }}
                  labelStyle={{ color: '#F5EDD6' }}
                  itemStyle={{ color: '#E8C97A' }}
                />
                <Bar dataKey="Allocated" fill="rgba(201,151,47,0.35)" radius={[3,3,0,0]} />
                <Bar dataKey="Spent" fill="#C9972F" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Activity feed + Task progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Activity log */}
        <motion.div {...fadeUp(0)} className="glass rounded-2xl p-6">
          <div className="section-eyebrow mb-1">Activity</div>
          <h3 className="font-display text-xl font-semibold text-cream mb-6">Recent Changes</h3>
          {activityLog.length === 0 ? (
            <p className="text-sm font-body text-center py-8" style={{ color: 'rgba(184,168,138,0.4)' }}>
              No activity yet — start editing to see changes here
            </p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {activityLog.slice(0, 15).map(entry => (
                <div key={entry.id} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-body mt-0.5"
                    style={
                      entry.user === 'Pranav'
                        ? { background: 'rgba(201,151,47,0.15)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.3)' }
                        : { background: 'rgba(126,39,135,0.15)', color: '#B85CC0', border: '1px solid rgba(126,39,135,0.3)' }
                    }
                  >
                    {entry.user?.[0] ?? '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(245,237,214,0.85)' }}>
                      <span className="font-semibold" style={{ color: entry.user === 'Pranav' ? '#E8C97A' : '#B85CC0' }}>
                        {entry.user}
                      </span>{' '}
                      {entry.message}
                    </p>
                    <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(184,168,138,0.4)' }}>
                      {timeAgo(entry.at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Task progress */}
        <motion.div {...fadeUp(1)} className="glass rounded-2xl p-6">
          <div className="section-eyebrow mb-1">Tasks</div>
          <h3 className="font-display text-xl font-semibold text-cream mb-6">Progress by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskCategories.map(cat => {
            const catTasks = tasks.filter(t => t.category === cat)
            const done = catTasks.filter(t => t.completed).length
            const pct = catTasks.length ? Math.round((done / catTasks.length) * 100) : 0
            return (
              <div key={cat} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium font-body text-cream">{cat}</span>
                  <span className="text-xs font-body tab-nums" style={{ color: '#E8C97A' }}>
                    {done}/{catTasks.length}
                  </span>
                </div>
                <div className="progress-track">
                  <motion.div
                    className="progress-fill-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        </motion.div>
      </div>
    </section>
  )
}
