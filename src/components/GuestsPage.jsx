import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Trash2, Pencil, Search, Users, BedDouble, CheckCircle2, X, Check } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'

const MEAL_OPTIONS = ['Veg', 'Non-Veg', 'Jain']
const RSVP_OPTIONS = ['pending', 'confirmed', 'declined']
const RELATION_OPTIONS = ['Family', 'Relative', 'Friend', 'Colleague', 'Neighbour', 'Other']

function rsvpBadge(rsvp) {
  if (rsvp === 'confirmed') return 'badge-green'
  if (rsvp === 'declined') return 'badge-red'
  return 'badge-amber'
}

function rsvpLabel(rsvp) {
  return rsvp === 'confirmed' ? 'Confirmed' : rsvp === 'declined' ? 'Declined' : 'Pending'
}

function emptyGuest() {
  return { name: '', phone: '', relation: 'Family', rsvp: 'pending', stayRequired: false, meal: 'Veg', notes: '' }
}

function GuestForm({ initial = emptyGuest(), onSave, onCancel, title }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-xl p-4 space-y-3"
    >
      <div className="font-body text-sm font-semibold text-cream mb-1">{title}</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <input className="input-dark" placeholder="Full name *" value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
        <input className="input-dark" placeholder="Phone / WhatsApp" value={form.phone} onChange={e => set('phone', e.target.value)} />
        <select className="select-dark" value={form.relation} onChange={e => set('relation', e.target.value)}>
          {RELATION_OPTIONS.map(r => <option key={r}>{r}</option>)}
        </select>
        <select className="select-dark" value={form.rsvp} onChange={e => set('rsvp', e.target.value)}>
          {RSVP_OPTIONS.map(r => <option key={r} value={r}>{rsvpLabel(r)}</option>)}
        </select>
        <select className="select-dark" value={form.meal} onChange={e => set('meal', e.target.value)}>
          {MEAL_OPTIONS.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <div
          className="w-4 h-4 rounded flex items-center justify-center transition-all"
          style={{ background: form.stayRequired ? '#C9972F' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,151,47,0.4)' }}
          onClick={() => set('stayRequired', !form.stayRequired)}
        >
          {form.stayRequired && <Check size={10} className="text-midnight" />}
        </div>
        <span className="text-xs font-body text-cream-muted">Stay required (overnight guest)</span>
      </label>
      <div className="flex gap-2 justify-end pt-1">
        <button onClick={onCancel} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
        <button
          onClick={() => { if (form.name.trim()) onSave(form) }}
          className="btn-gold text-xs py-1.5 px-3"
        >
          Save Guest
        </button>
      </div>
    </motion.div>
  )
}

function GuestCard({ guest, onToggleRsvp, onEdit, onDelete, editMode, accentColor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass rounded-xl px-4 py-3 flex items-start gap-3"
      style={{ borderColor: `${accentColor}20` }}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm font-semibold"
        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30`, color: accentColor }}
      >
        {guest.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-sm font-medium text-cream truncate">{guest.name}</span>
          <span className={rsvpBadge(guest.rsvp)}>{rsvpLabel(guest.rsvp)}</span>
          {guest.stayRequired && (
            <span className="badge-gold"><BedDouble size={9} className="mr-1" />Stay</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          {guest.relation && <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>{guest.relation}</span>}
          {guest.phone && <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>{guest.phone}</span>}
          {guest.meal && <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>{guest.meal}</span>}
        </div>
      </div>

      {editMode && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onEdit} className="p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: 'rgba(184,168,138,0.5)' }}>
            <Pencil size={12} />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg transition-all hover:bg-red-900/20" style={{ color: 'rgba(184,168,138,0.5)' }}>
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

function GuestColumn({ side, label, accentColor, guests, onAdd, onUpdate, onDelete, editMode }) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const filtered = guests.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.phone?.includes(search) ||
    g.relation?.toLowerCase().includes(search.toLowerCase())
  )

  const confirmed = guests.filter(g => g.rsvp === 'confirmed').length
  const stay = guests.filter(g => g.stayRequired).length

  return (
    <div className="flex-1 min-w-0">
      {/* Column header */}
      <div
        className="glass rounded-2xl p-5 mb-4"
        style={{ borderColor: `${accentColor}30` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="section-eyebrow mb-0.5" style={{ color: accentColor }}>{label}</div>
            <div className="font-display text-2xl font-semibold text-cream">{guests.length} Guests</div>
          </div>
          {editMode && (
            <button
              onClick={() => setShowAdd(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor }}
            >
              <UserPlus size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Confirmed</div>
            <div className="font-display text-lg font-semibold tab-nums" style={{ color: accentColor }}>{confirmed}</div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Stay Guests</div>
            <div className="font-display text-lg font-semibold tab-nums" style={{ color: accentColor }}>{stay} / 50</div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Pending</div>
            <div className="font-display text-lg font-semibold tab-nums" style={{ color: accentColor }}>
              {guests.filter(g => g.rsvp === 'pending').length}
            </div>
          </div>
        </div>
        {/* Stay progress bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-body" style={{ color: 'rgba(184,168,138,0.5)' }}>Stay capacity</span>
            <span className="text-xs font-body tab-nums" style={{ color: accentColor }}>{stay}/50</span>
          </div>
          <div className="progress-track">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (stay/50)*100)}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(184,168,138,0.4)' }} />
        <input
          className="input-dark pl-8"
          placeholder="Search guests…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <div className="mb-3">
            <GuestForm
              title="Add Guest"
              onSave={g => { onAdd(side, g); setShowAdd(false) }}
              onCancel={() => setShowAdd(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Guest list */}
      <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Users size={28} className="mx-auto mb-2" style={{ color: 'rgba(184,168,138,0.2)' }} />
              <p className="text-sm font-body" style={{ color: 'rgba(184,168,138,0.4)' }}>
                {guests.length === 0 ? (editMode ? 'Add your first guest above' : 'No guests yet') : 'No results'}
              </p>
            </motion.div>
          )}
          {filtered.map(g =>
            editingId === g.id ? (
              <div key={g.id} className="mb-2">
                <GuestForm
                  initial={g}
                  title="Edit Guest"
                  onSave={patch => { onUpdate(side, g.id, patch); setEditingId(null) }}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <GuestCard
                key={g.id}
                guest={g}
                editMode={editMode}
                accentColor={accentColor}
                onEdit={() => setEditingId(g.id)}
                onDelete={() => onDelete(side, g.id)}
              />
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function GuestsPage() {
  const { guests, editMode, addGuest, updateGuest, deleteGuest } = useWeddingStore()

  const totalGuests = guests.groomSide.length + guests.brideSide.length
  const totalConfirmed = guests.groomSide.filter(g => g.rsvp === 'confirmed').length
                       + guests.brideSide.filter(g => g.rsvp === 'confirmed').length
  const totalStay = guests.groomSide.filter(g => g.stayRequired).length
                  + guests.brideSide.filter(g => g.stayRequired).length

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="section-eyebrow mb-2">Guest List</div>
        <h2 className="section-title">Manage Guests</h2>

        {/* Overall summary */}
        <div className="flex flex-wrap gap-6 mt-4">
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Total Added</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#E8C97A' }}>{totalGuests}</div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Confirmed</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#86efac' }}>{totalConfirmed}</div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Stay Guests</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#B85CC0' }}>{totalStay} / 100</div>
          </div>
          <div>
            <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Wedding Day Target</div>
            <div className="font-display text-2xl font-semibold tab-nums" style={{ color: '#E8C97A' }}>350</div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <GuestColumn
          side="groomSide"
          label="Pranav's Side"
          accentColor="#C9972F"
          guests={guests.groomSide}
          onAdd={addGuest}
          onUpdate={updateGuest}
          onDelete={deleteGuest}
          editMode={editMode}
        />

        {/* Divider */}
        <div
          className="hidden lg:block w-px self-stretch"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(201,151,47,0.2), transparent)' }}
        />

        <GuestColumn
          side="brideSide"
          label="Renuka's Side"
          accentColor="#7E2787"
          guests={guests.brideSide}
          onAdd={addGuest}
          onUpdate={updateGuest}
          onDelete={deleteGuest}
          editMode={editMode}
        />
      </div>
    </section>
  )
}
