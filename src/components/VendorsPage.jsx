import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Phone, User, IndianRupee, CheckCircle2, XCircle } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'

const CATEGORIES = [
  { key: 'catering',    label: 'Catering',        emoji: '🍽️' },
  { key: 'photography', label: 'Photography',      emoji: '📷' },
  { key: 'videography', label: 'Videography',      emoji: '🎥' },
  { key: 'decor',       label: 'Decoration',       emoji: '🌸' },
  { key: 'priest',      label: 'Priest / Guruji',  emoji: '🕉️' },
  { key: 'music',       label: 'Music / DJ',       emoji: '🎵' },
  { key: 'tent',        label: 'Tent House',       emoji: '⛺' },
  { key: 'mehendi',     label: 'Mehendi Artist',   emoji: '✋' },
  { key: 'makeup',      label: 'Makeup Artist',    emoji: '💄' },
  { key: 'transport',   label: 'Transport',        emoji: '🚌' },
]

const STATUS_OPTIONS = [
  { key: 'not_started', label: 'Not Started',   badge: 'badge-gray'  },
  { key: 'advance_paid', label: 'Advance Paid',  badge: 'badge-amber' },
  { key: 'balance_due',  label: 'Balance Due',   badge: 'badge-red'   },
  { key: 'fully_paid',   label: 'Fully Paid',    badge: 'badge-green' },
]

function statusInfo(key) {
  return STATUS_OPTIONS.find(s => s.key === key) || STATUS_OPTIONS[0]
}

function fmtFull(n) {
  return n ? `₹${Number(n).toLocaleString('en-IN')}` : '—'
}

function emptyVendor(cat) {
  return { category: cat || 'catering', name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' }
}

function VendorForm({ initial, onSave, onCancel, title }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass rounded-xl p-4 space-y-3 mb-4"
    >
      <div className="text-sm font-semibold font-body text-cream">{title}</div>
      <div className="grid grid-cols-2 gap-2">
        <input className="input-dark col-span-2" placeholder="Vendor / business name *" value={form.name} onChange={e => set('name', e.target.value)} />
        <input className="input-dark" placeholder="Contact person" value={form.contact} onChange={e => set('contact', e.target.value)} />
        <input className="input-dark" placeholder="Phone number" value={form.phone} onChange={e => set('phone', e.target.value)} />
        <input type="number" className="input-dark" placeholder="Quoted amount (₹)" value={form.amount || ''} onChange={e => set('amount', Number(e.target.value))} />
        <input type="number" className="input-dark" placeholder="Advance paid (₹)" value={form.advancePaid || ''} onChange={e => set('advancePaid', Number(e.target.value))} />
        <select className="select-dark col-span-2" value={form.status} onChange={e => set('status', e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <input className="input-dark col-span-2" placeholder="Notes (optional)" value={form.notes} onChange={e => set('notes', e.target.value)} />
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
        <button onClick={() => { if (form.name.trim()) onSave(form) }} className="btn-gold text-xs py-1.5 px-3">Save Vendor</button>
      </div>
    </motion.div>
  )
}

function VendorCard({ vendor, catInfo, editMode, onEdit, onDelete }) {
  const statusMeta = statusInfo(vendor.status)
  const balance = (vendor.amount || 0) - (vendor.advancePaid || 0)
  const isEmpty = !vendor.name

  if (isEmpty && !editMode) return null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="glass rounded-xl p-4"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{catInfo.emoji}</span>
          <div>
            <div className="font-body text-sm font-semibold text-cream">
              {vendor.name || <span style={{ color: 'rgba(184,168,138,0.35)', fontWeight: 400, fontStyle: 'italic' }}>Not assigned yet</span>}
            </div>
            <div className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>{catInfo.label}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className={statusMeta.badge} style={{ fontSize: '0.65rem' }}>{statusMeta.label}</span>
          {editMode && (
            <>
              <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-white/5 transition-all" style={{ color: 'rgba(184,168,138,0.5)' }}>
                <Pencil size={11} />
              </button>
              <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-900/20 transition-all" style={{ color: 'rgba(184,168,138,0.5)' }}>
                <Trash2 size={11} />
              </button>
            </>
          )}
        </div>
      </div>

      {vendor.name && (
        <div className="space-y-1.5">
          {vendor.contact && (
            <div className="flex items-center gap-2">
              <User size={11} style={{ color: 'rgba(184,168,138,0.4)' }} />
              <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.6)' }}>{vendor.contact}</span>
            </div>
          )}
          {vendor.phone && (
            <div className="flex items-center gap-2">
              <Phone size={11} style={{ color: 'rgba(184,168,138,0.4)' }} />
              <a href={`tel:${vendor.phone}`} className="text-xs font-body hover:text-gold-light transition-colors" style={{ color: 'rgba(184,168,138,0.6)' }}>
                {vendor.phone}
              </a>
            </div>
          )}
          {vendor.amount > 0 && (
            <div className="flex items-center gap-2">
              <IndianRupee size={11} style={{ color: 'rgba(184,168,138,0.4)' }} />
              <span className="text-xs font-body tab-nums" style={{ color: '#F5EDD6' }}>
                {fmtFull(vendor.amount)}
                {vendor.advancePaid > 0 && (
                  <span style={{ color: 'rgba(184,168,138,0.5)' }}>
                    {' '}· Advance: {fmtFull(vendor.advancePaid)} · Balance: {fmtFull(balance)}
                  </span>
                )}
              </span>
            </div>
          )}
          {vendor.notes && (
            <p className="text-xs font-body mt-1" style={{ color: 'rgba(184,168,138,0.45)' }}>{vendor.notes}</p>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function VendorsPage() {
  const { vendors, editMode, addVendor, updateVendor, deleteVendor } = useWeddingStore()
  const [filterCat, setFilterCat] = useState('all')
  const [addForCat, setAddForCat] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const totalContracted = vendors.filter(v => v.amount > 0).reduce((s, v) => s + v.amount, 0)
  const totalPaid = vendors.reduce((s, v) => s + (v.advancePaid || 0), 0)
  const confirmed = vendors.filter(v => v.status === 'fully_paid' || v.status === 'advance_paid').length

  const visibleVendors = filterCat === 'all'
    ? vendors
    : vendors.filter(v => v.category === filterCat)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="section-eyebrow mb-2">Service Providers</div>
        <h2 className="section-title mb-4">Vendors</h2>

        {/* Summary */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Total Contracted</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#E8C97A' }}>
              {totalContracted ? `₹${(totalContracted/100000).toFixed(1)}L` : '—'}
            </div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Advance Paid</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#86efac' }}>
              {totalPaid ? `₹${(totalPaid/1000).toFixed(0)}K` : '—'}
            </div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Confirmed Vendors</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#B85CC0' }}>{confirmed}</div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCat('all')}
            className="px-3 py-1.5 rounded-lg text-xs font-body transition-all"
            style={filterCat === 'all'
              ? { background: 'rgba(201,151,47,0.15)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.35)' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(184,168,138,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            All
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setFilterCat(c.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-body transition-all"
              style={filterCat === c.key
                ? { background: 'rgba(201,151,47,0.15)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.35)' }
                : { background: 'rgba(255,255,255,0.04)', color: 'rgba(184,168,138,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Add form */}
      <AnimatePresence>
        {addForCat && (
          <VendorForm
            initial={emptyVendor(addForCat)}
            title={`Add ${CATEGORIES.find(c => c.key === addForCat)?.label} Vendor`}
            onSave={v => { addVendor(v); setAddForCat(null) }}
            onCancel={() => setAddForCat(null)}
          />
        )}
        {editingId && (
          <VendorForm
            initial={vendors.find(v => v.id === editingId)}
            title="Edit Vendor"
            onSave={patch => { updateVendor(editingId, patch); setEditingId(null) }}
            onCancel={() => setEditingId(null)}
          />
        )}
      </AnimatePresence>

      {/* Vendor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES
          .filter(cat => filterCat === 'all' || filterCat === cat.key)
          .map(catInfo => {
            const catVendors = visibleVendors.filter(v => v.category === catInfo.key)
            return (
              <div key={catInfo.key}>
                <AnimatePresence>
                  {catVendors.map(v =>
                    <VendorCard
                      key={v.id}
                      vendor={v}
                      catInfo={catInfo}
                      editMode={editMode}
                      onEdit={() => setEditingId(v.id)}
                      onDelete={() => deleteVendor(v.id)}
                    />
                  )}
                </AnimatePresence>
                {/* Empty state slot */}
                {catVendors.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-xl p-4 flex items-center gap-3"
                    style={{ borderStyle: 'dashed', borderColor: 'rgba(201,151,47,0.15)' }}
                  >
                    <span className="text-xl">{catInfo.emoji}</span>
                    <div>
                      <div className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.4)', fontStyle: 'italic' }}>
                        {catInfo.label} not assigned
                      </div>
                      {editMode && (
                        <button
                          onClick={() => setAddForCat(catInfo.key)}
                          className="text-xs font-body mt-0.5 transition-colors"
                          style={{ color: '#C9972F' }}
                        >
                          + Add vendor
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
                {editMode && catVendors.length > 0 && (
                  <button
                    onClick={() => setAddForCat(catInfo.key)}
                    className="mt-2 w-full py-2 rounded-lg text-xs font-body border transition-all"
                    style={{ borderColor: 'rgba(201,151,47,0.15)', color: 'rgba(201,151,47,0.5)', borderStyle: 'dashed' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.4)'; e.currentTarget.style.color = '#C9972F' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.15)'; e.currentTarget.style.color = 'rgba(201,151,47,0.5)' }}
                  >
                    + Add another
                  </button>
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}
