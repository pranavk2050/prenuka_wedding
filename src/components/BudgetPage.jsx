import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, IndianRupee, TrendingUp, Wallet } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import useWeddingStore from '../store/useWeddingStore'

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n.toLocaleString('en-IN')}`
}

function fmtFull(n) {
  return `₹${(n || 0).toLocaleString('en-IN')}`
}

const COLORS = ['#C9972F','#E8C97A','#7E2787','#B85CC0','#2E8B57','#4682B4','#CD853F','#9370DB','#20B2AA','#D2691E','#6495ED','#BC8F8F','#3CB371']


function CategoryRow({ cat, index, editMode, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({ name: cat.name, allocated: cat.allocated, spent: cat.spent || 0 })
  const spent = cat.spent || 0
  const pct = cat.allocated ? Math.min(100, Math.round((spent / cat.allocated) * 100)) : 0
  const over = spent > cat.allocated

  function saveEdit() {
    onUpdate(cat.id, { name: form.name, allocated: Number(form.allocated), spent: Number(form.spent) })
    setEditing(false)
  }

  if (editing) {
    return (
      <motion.div layout className="glass rounded-xl overflow-hidden">
        <div className="px-5 py-4 space-y-3">
          <div className="text-xs font-semibold font-body" style={{ color: '#E8C97A' }}>Edit Category</div>
          <input
            className="input-dark w-full"
            placeholder="Category name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-body block mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Allocated (₹)</label>
              <input
                type="number"
                className="input-dark w-full"
                value={form.allocated}
                onChange={e => setForm(f => ({ ...f, allocated: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-body block mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Spent (₹)</label>
              <input
                type="number"
                className="input-dark w-full"
                value={form.spent}
                onChange={e => setForm(f => ({ ...f, spent: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(false)} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
            <button onClick={saveEdit} className="btn-gold text-xs py-1.5 px-3">Save</button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div className="flex items-center gap-4 px-5 py-4">
        {/* Color swatch */}
        <div
          className="w-2 h-8 rounded-full flex-shrink-0"
          style={{ background: COLORS[index % COLORS.length] }}
        />

        {/* Name + progress */}
        <div className="flex-1 min-w-0">
          <span className="font-body text-sm font-medium text-cream block truncate">{cat.name}</span>
          <div className="mt-1.5 progress-track">
            <motion.div
              className="h-full rounded-full transition-all"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
              style={{ background: over ? '#ef4444' : `linear-gradient(90deg, ${COLORS[index % COLORS.length]}, ${COLORS[index % COLORS.length]}90)` }}
            />
          </div>
        </div>

        {/* Numbers */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Allocated</div>
            <span className="text-sm font-body tab-nums text-cream">{fmtFull(cat.allocated)}</span>
          </div>
          <div className="text-right">
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Spent</div>
            <span className="text-sm font-body tab-nums" style={{ color: over ? '#fca5a5' : '#86efac' }}>{fmtFull(spent)}</span>
          </div>
          <div className="text-right hidden md:block">
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Remaining</div>
            <span className="text-sm font-body tab-nums" style={{ color: over ? '#fca5a5' : 'rgba(184,168,138,0.7)' }}>
              {over ? `-${fmtFull(spent - cat.allocated)}` : fmtFull(cat.allocated - spent)}
            </span>
          </div>
          <div className="w-10 text-right">
            <span className="text-sm font-semibold font-body tab-nums" style={{ color: over ? '#fca5a5' : '#E8C97A' }}>
              {pct}%
            </span>
          </div>
          {editMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setForm({ name: cat.name, allocated: cat.allocated, spent: cat.spent || 0 }); setEditing(true) }}
                className="p-1.5 rounded-lg hover:bg-gold/10 transition-all"
                style={{ color: 'rgba(184,168,138,0.5)' }}
                title="Edit category"
              >
                <Pencil size={12} />
              </button>
              <button
                onClick={() => onDelete(cat.id)}
                className="p-1.5 rounded-lg hover:bg-red-900/20 transition-all"
                style={{ color: 'rgba(184,168,138,0.4)' }}
                title="Delete category"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function BudgetPage() {
  const { budget, editMode, setTotalBudget, updateBudgetCategory, addBudgetCategory, deleteBudgetCategory } = useWeddingStore()
  const [showAddCat, setShowAddCat] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatAlloc, setNewCatAlloc] = useState(0)

  const totalAllocated = budget.categories.reduce((s, c) => s + c.allocated, 0)
  const totalSpent = budget.categories.reduce((s, c) => s + (c.spent || 0), 0)
  const totalRemaining = budget.totalBudget - totalSpent
  const overallPct = budget.totalBudget ? Math.min(100, Math.round((totalSpent / budget.totalBudget) * 100)) : 0
  const unallocated = budget.totalBudget - totalAllocated

  const pieData = budget.categories.filter(c => c.allocated > 0).map(c => ({
    name: c.name, value: c.allocated
  }))

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="section-eyebrow mb-2">Finance</div>
        <h2 className="section-title">Budget Tracker</h2>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-5"
        >
          <div className="font-body text-xs mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Total Budget</div>
          {editMode ? (
            <div>
              <input
                type="number"
                className="input-dark w-full"
                value={budget.totalBudget}
                onChange={e => setTotalBudget(Number(e.target.value))}
              />
            </div>
          ) : (
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#E8C97A' }}>
              {fmt(budget.totalBudget)}
            </div>
          )}
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.4)' }}>Total planned budget</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5"
        >
          <div className="font-body text-xs mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Total Spent</div>
          <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#86efac' }}>
            {fmt(totalSpent)}
          </div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.4)' }}>{overallPct}% of budget</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-5"
        >
          <div className="font-body text-xs mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Remaining</div>
          <div
            className="font-display text-2xl font-semibold tab-nums"
            style={{ color: totalRemaining >= 0 ? '#86efac' : '#fca5a5' }}
          >
            {totalRemaining >= 0 ? fmt(totalRemaining) : `-${fmt(Math.abs(totalRemaining))}`}
          </div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.4)' }}>Available to spend</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5"
        >
          <div className="font-body text-xs mb-1" style={{ color: 'rgba(184,168,138,0.5)' }}>Unallocated</div>
          <div
            className="font-display text-2xl font-semibold tab-nums"
            style={{ color: unallocated < 0 ? '#fca5a5' : '#E8C97A' }}
          >
            {unallocated < 0 ? `-${fmt(Math.abs(unallocated))}` : fmt(unallocated)}
          </div>
          <div className="font-body text-xs mt-1" style={{ color: 'rgba(184,168,138,0.4)' }}>Budget not yet allocated</div>
        </motion.div>
      </div>

      {/* Overall progress bar */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="glass rounded-xl p-5 mb-8"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-body text-sm font-medium text-cream">Overall Spending</span>
          <span className="font-body text-sm font-semibold tab-nums" style={{ color: '#E8C97A' }}>{overallPct}%</span>
        </div>
        <div className="progress-track" style={{ height: 10 }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ background: overallPct > 90 ? '#ef4444' : 'linear-gradient(90deg, #C9972F, #E8C97A)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>Spent: {fmtFull(totalSpent)}</span>
          <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>Budget: {fmtFull(budget.totalBudget)}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-cream">Categories</h3>
            {editMode && (
              <button onClick={() => setShowAddCat(true)} className="btn-gold flex items-center gap-1.5 text-xs py-1.5 px-3">
                <Plus size={12} /> Add Category
              </button>
            )}
          </div>

          <AnimatePresence>
            {showAddCat && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-xl p-4 mb-4 space-y-2"
              >
                <div className="text-sm font-semibold font-body text-cream">New Category</div>
                <input className="input-dark" placeholder="Category name" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
                <input type="number" className="input-dark" placeholder="Allocated amount (₹)" value={newCatAlloc || ''} onChange={e => setNewCatAlloc(Number(e.target.value))} />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowAddCat(false)} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
                  <button
                    onClick={() => {
                      if (newCatName.trim()) {
                        addBudgetCategory({ name: newCatName, allocated: newCatAlloc })
                        setNewCatName('')
                        setNewCatAlloc(0)
                        setShowAddCat(false)
                      }
                    }}
                    className="btn-gold text-xs py-1.5 px-3"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {budget.categories.map((cat, i) => (
              <CategoryRow
                key={cat.id}
                cat={cat}
                index={i}
                editMode={editMode}
                onUpdate={updateBudgetCategory}
                onDelete={deleteBudgetCategory}
              />
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display text-lg font-semibold text-cream mb-4">Allocation</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} paddingAngle={2} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip
                formatter={(v) => [fmtFull(v), 'Allocated']}
                contentStyle={{ background: '#1A1230', border: '1px solid rgba(201,151,47,0.3)', borderRadius: 8, fontSize: 11, fontFamily: 'Inter' }}
                labelStyle={{ color: '#F5EDD6' }}
                itemStyle={{ color: '#E8C97A' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {budget.categories.slice(0, 6).map((c, i) => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-xs font-body truncate" style={{ color: 'rgba(184,168,138,0.6)', flex: 1 }}>{c.name}</span>
                <span className="text-xs font-body tab-nums" style={{ color: 'rgba(184,168,138,0.5)' }}>{fmt(c.allocated)}</span>
              </div>
            ))}
            {budget.categories.length > 6 && (
              <div className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.4)' }}>
                +{budget.categories.length - 6} more categories
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
