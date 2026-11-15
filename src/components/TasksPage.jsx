import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Pencil, Check, Filter } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'

const CATEGORIES = ['Rituals', 'Venue', 'Catering', 'Decoration', 'Photography', 'Clothing', 'Beauty', 'Invitations', 'Music', 'Miscellaneous']
const PRIORITIES = ['high', 'medium', 'low']
const SIDES = ['both', 'groom', 'bride']

function priorityBadge(p) {
  if (p === 'high') return 'badge-red'
  if (p === 'medium') return 'badge-amber'
  return 'badge-blue'
}

function sideBadge(s) {
  if (s === 'groom') return 'badge-gold'
  if (s === 'bride') return 'badge-purple'
  return 'badge-gray'
}

function emptyTask() {
  return { title: '', category: 'Venue', side: 'both', priority: 'medium', dueDate: '', notes: '' }
}

function TaskForm({ initial = emptyTask(), onSave, onCancel, title }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass rounded-xl p-4 space-y-3 mb-3"
    >
      <div className="text-sm font-semibold font-body text-cream">{title}</div>
      <input className="input-dark" placeholder="Task title *" value={form.title} onChange={e => set('title', e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <select className="select-dark" value={form.category} onChange={e => set('category', e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="select-dark" value={form.side} onChange={e => set('side', e.target.value)}>
          <option value="both">Both Sides</option>
          <option value="groom">Pranav's Side</option>
          <option value="bride">Renuka's Side</option>
        </select>
        <select className="select-dark" value={form.priority} onChange={e => set('priority', e.target.value)}>
          {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
        </select>
        <input type="date" className="input-dark" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
      </div>
      <input className="input-dark" placeholder="Notes (optional)" value={form.notes} onChange={e => set('notes', e.target.value)} />
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
        <button onClick={() => { if (form.title.trim()) onSave(form) }} className="btn-gold text-xs py-1.5 px-3">Save</button>
      </div>
    </motion.div>
  )
}

function TaskCard({ task, editMode, onToggle, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex items-start gap-3 glass rounded-xl px-4 py-3"
      style={{ opacity: task.completed ? 0.55 : 1 }}
    >
      <button
        onClick={onToggle}
        className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          background: task.completed ? '#C9972F' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${task.completed ? '#C9972F' : 'rgba(201,151,47,0.3)'}`,
        }}
      >
        {task.completed && <Check size={11} className="text-midnight" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <span
            className={`text-sm font-medium font-body ${task.completed ? 'line-through' : ''}`}
            style={{ color: task.completed ? 'rgba(184,168,138,0.5)' : '#F5EDD6' }}
          >
            {task.title}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className={priorityBadge(task.priority)} style={{ fontSize: '0.65rem' }}>
            {task.priority}
          </span>
          <span className={sideBadge(task.side)} style={{ fontSize: '0.65rem' }}>
            {task.side === 'groom' ? "Pranav's" : task.side === 'bride' ? "Renuka's" : 'Shared'}
          </span>
          {task.dueDate && (
            <span className="badge-gray" style={{ fontSize: '0.65rem' }}>
              Due {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          )}
        </div>
        {task.notes && (
          <p className="text-xs font-body mt-1" style={{ color: 'rgba(184,168,138,0.5)' }}>{task.notes}</p>
        )}
      </div>

      {editMode && (
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-white/5 transition-all" style={{ color: 'rgba(184,168,138,0.5)' }}>
            <Pencil size={11} />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-900/20 transition-all" style={{ color: 'rgba(184,168,138,0.5)' }}>
            <Trash2 size={11} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default function TasksPage() {
  const { tasks, editMode, addTask, toggleTask, updateTask, deleteTask } = useWeddingStore()
  const [filterCat, setFilterCat] = useState('All')
  const [filterSide, setFilterSide] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const totalDone = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const pct = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0

  const filtered = tasks.filter(t => {
    const catOk = filterCat === 'All' || t.category === filterCat
    const sideOk = filterSide === 'all' || t.side === filterSide || t.side === 'both'
    return catOk && sideOk
  })

  const categories = ['All', ...CATEGORIES.filter(c => tasks.some(t => t.category === c))]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="section-eyebrow mb-2">Planning Checklist</div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="section-title">Tasks</h2>
            <p className="text-sm font-body mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
              {totalDone} of {totalTasks} tasks completed
            </p>
          </div>
          {editMode && (
            <button onClick={() => setShowAdd(true)} className="btn-gold flex items-center gap-2 self-start sm:self-auto">
              <Plus size={14} /> Add Task
            </button>
          )}
        </div>

        {/* Overall progress */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium font-body text-cream">Overall Progress</span>
            <span className="text-sm font-semibold font-body tab-nums" style={{ color: '#E8C97A' }}>{pct}%</span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill-gold"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex flex-wrap gap-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className="px-3 py-1 rounded-lg text-xs font-body transition-all"
                style={filterCat === c
                  ? { background: 'rgba(201,151,47,0.2)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.4)' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'rgba(184,168,138,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            {[['all', 'All'], ['groom', "Pranav's"], ['bride', "Renuka's"]].map(([val, lbl]) => (
              <button
                key={val}
                onClick={() => setFilterSide(val)}
                className="px-3 py-1 rounded-lg text-xs font-body transition-all"
                style={filterSide === val
                  ? { background: 'rgba(201,151,47,0.15)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.35)' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'rgba(184,168,138,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <TaskForm
            title="Add New Task"
            onSave={t => { addTask(t); setShowAdd(false) }}
            onCancel={() => setShowAdd(false)}
          />
        )}
      </AnimatePresence>

      {/* Task list grouped by category */}
      {CATEGORIES.filter(cat => (filterCat === 'All' || filterCat === cat) && filtered.some(t => t.category === cat)).map(cat => {
        const catTasks = filtered.filter(t => t.category === cat)
        if (!catTasks.length) return null
        const done = catTasks.filter(t => t.completed).length
        const catPct = Math.round((done / catTasks.length) * 100)

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-body text-sm font-semibold text-cream">{cat}</span>
                <span className="font-body text-xs tab-nums" style={{ color: '#E8C97A' }}>{done}/{catTasks.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 progress-track">
                  <div
                    className="progress-fill-gold"
                    style={{ width: `${catPct}%` }}
                  />
                </div>
                <span className="text-xs font-body tab-nums w-8 text-right" style={{ color: 'rgba(184,168,138,0.5)' }}>{catPct}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {catTasks.map(t =>
                  editingId === t.id ? (
                    <TaskForm
                      key={t.id}
                      initial={t}
                      title="Edit Task"
                      onSave={patch => { updateTask(t.id, patch); setEditingId(null) }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <TaskCard
                      key={t.id}
                      task={t}
                      editMode={editMode}
                      onToggle={() => toggleTask(t.id)}
                      onEdit={() => setEditingId(t.id)}
                      onDelete={() => deleteTask(t.id)}
                    />
                  )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Check size={36} className="mx-auto mb-3" style={{ color: 'rgba(184,168,138,0.15)' }} />
          <p className="font-body text-sm" style={{ color: 'rgba(184,168,138,0.4)' }}>No tasks match current filters</p>
        </div>
      )}
    </section>
  )
}
