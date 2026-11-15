import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Plus, Pencil, Trash2 } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'

function emptyEvent() {
  return { time: '10:00', title: '', subtitle: '', duration: 60, location: '', description: '' }
}

function EventForm({ initial = emptyEvent(), onSave, onCancel, title: formTitle }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass rounded-xl p-4 space-y-3 my-4"
    >
      <div className="text-sm font-semibold font-body text-cream">{formTitle}</div>
      <div className="grid grid-cols-2 gap-2">
        <input type="time" className="input-dark" value={form.time} onChange={e => set('time', e.target.value)} />
        <input type="number" className="input-dark" placeholder="Duration (mins)" value={form.duration || ''} onChange={e => set('duration', Number(e.target.value))} />
        <input className="input-dark col-span-2" placeholder="Event name *" value={form.title} onChange={e => set('title', e.target.value)} />
        <input className="input-dark col-span-2" placeholder="Marathi/Sanskrit subtitle (optional)" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} />
        <input className="input-dark col-span-2" placeholder="Location within venue" value={form.location} onChange={e => set('location', e.target.value)} />
        <textarea className="input-dark col-span-2" rows={2} placeholder="Description" value={form.description} onChange={e => set('description', e.target.value)} />
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="btn-ghost text-xs py-1.5 px-3">Cancel</button>
        <button onClick={() => { if (form.title.trim()) onSave(form) }} className="btn-gold text-xs py-1.5 px-3">Save</button>
      </div>
    </motion.div>
  )
}

function TimelineEvent({ event, index, isLast, editMode, onEdit, onDelete, side = 'right' }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`flex gap-4 ${side === 'left' ? 'flex-row-reverse' : ''}`}
    >
      {/* Timeline node */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 z-10"
          style={{ background: 'linear-gradient(135deg, #C9972F, #E8C97A)', boxShadow: '0 0 8px rgba(201,151,47,0.5)', marginTop: 20 }}
        />
        {!isLast && (
          <div
            className="w-px flex-1"
            style={{ background: 'linear-gradient(180deg, rgba(201,151,47,0.4) 0%, rgba(201,151,47,0.1) 100%)', marginTop: 4 }}
          />
        )}
      </div>

      {/* Event card */}
      <div className="flex-1 pb-6">
        <div
          className="glass rounded-xl p-4 cursor-pointer hover:bg-white/[0.02] transition-all"
          onClick={() => setExpanded(e => !e)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <div
                  className="glass rounded-lg px-2.5 py-1 flex items-center gap-1.5"
                  style={{ background: 'rgba(201,151,47,0.1)', border: '1px solid rgba(201,151,47,0.25)' }}
                >
                  <Clock size={11} style={{ color: '#C9972F' }} />
                  <span className="font-body text-xs font-semibold tab-nums" style={{ color: '#E8C97A' }}>{event.time}</span>
                </div>
                {event.duration > 0 && (
                  <span className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.4)' }}>
                    {event.duration < 60 ? `${event.duration}m` : `${(event.duration / 60).toFixed(1)}h`}
                  </span>
                )}
              </div>
              <h4 className="font-display text-lg font-semibold text-cream leading-tight">{event.title}</h4>
              {event.subtitle && (
                <p className="font-display italic text-sm mt-0.5" style={{ color: '#C9972F' }}>{event.subtitle}</p>
              )}
              {event.location && (
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin size={11} style={{ color: 'rgba(184,168,138,0.4)' }} />
                  <span className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>{event.location}</span>
                </div>
              )}
            </div>
            {editMode && (
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={e => { e.stopPropagation(); onEdit() }} className="p-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(184,168,138,0.5)' }}>
                  <Pencil size={11} />
                </button>
                <button onClick={e => { e.stopPropagation(); onDelete() }} className="p-1.5 rounded-lg hover:bg-red-900/20" style={{ color: 'rgba(184,168,138,0.5)' }}>
                  <Trash2 size={11} />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {expanded && event.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="font-body text-sm mt-3 leading-relaxed overflow-hidden"
                style={{ color: 'rgba(184,168,138,0.7)' }}
              >
                {event.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function DayTimeline({ day, dayLabel, dateLabel, events, editMode, onAdd, onUpdate, onDelete }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div>
      {/* Day header */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="section-eyebrow mb-1">{dateLabel}</div>
        <h3 className="font-display text-3xl font-semibold text-cream">{dayLabel}</h3>
        <p className="font-body text-sm mt-1" style={{ color: 'rgba(184,168,138,0.6)' }}>
          {events.length} events · Coco Resort, Punawale, Pune
        </p>
        {editMode && (
          <button onClick={() => setShowAdd(true)} className="mt-4 btn-gold flex items-center gap-2 text-sm">
            <Plus size={14} /> Add Event
          </button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <EventForm
            formTitle="Add Event"
            onSave={e => { onAdd(day, e); setShowAdd(false) }}
            onCancel={() => setShowAdd(false)}
          />
        )}
      </AnimatePresence>

      {/* Timeline */}
      <div className="pl-2">
        {sorted.map((evt, i) =>
          editingId === evt.id ? (
            <div key={evt.id} className="pl-6">
              <EventForm
                initial={evt}
                formTitle="Edit Event"
                onSave={patch => { onUpdate(day, evt.id, patch); setEditingId(null) }}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <TimelineEvent
              key={evt.id}
              event={evt}
              index={i}
              isLast={i === sorted.length - 1}
              editMode={editMode}
              side={i % 2 === 0 ? 'right' : 'right'}
              onEdit={() => setEditingId(evt.id)}
              onDelete={() => onDelete(day, evt.id)}
            />
          )
        )}
      </div>
    </div>
  )
}

export default function SchedulePage() {
  const { schedule, editMode, addScheduleEvent, updateScheduleEvent, deleteScheduleEvent } = useWeddingStore()
  const [activeDay, setActiveDay] = useState('feb11')

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="section-eyebrow mb-2">Event Schedule</div>
        <h2 className="section-title mb-6">Wedding Programme</h2>

        {/* Day tabs */}
        <div className="flex gap-2">
          {[
            { key: 'feb11', label: '11 February', sub: 'Srimant Pujan & Sangeet' },
            { key: 'feb12', label: '12 February', sub: 'Vivah Sohala' },
          ].map(d => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl transition-all text-left"
              style={activeDay === d.key
                ? { background: 'rgba(201,151,47,0.15)', border: '1px solid rgba(201,151,47,0.4)' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              <div
                className="font-display text-lg font-semibold"
                style={{ color: activeDay === d.key ? '#E8C97A' : '#F5EDD6' }}
              >
                {d.label}
              </div>
              <div
                className="font-body text-xs"
                style={{ color: activeDay === d.key ? '#C9972F' : 'rgba(184,168,138,0.5)' }}
              >
                {d.sub}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeDay === 'feb11' && (
          <motion.div
            key="feb11"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DayTimeline
              day="feb11"
              dayLabel="Srimant Pujan & Sangeet"
              dateLabel="Thursday, 11 February 2027"
              events={schedule.feb11}
              editMode={editMode}
              onAdd={addScheduleEvent}
              onUpdate={updateScheduleEvent}
              onDelete={deleteScheduleEvent}
            />
          </motion.div>
        )}
        {activeDay === 'feb12' && (
          <motion.div
            key="feb12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DayTimeline
              day="feb12"
              dayLabel="Vivah Sohala — Wedding Day"
              dateLabel="Friday, 12 February 2027"
              events={schedule.feb12}
              editMode={editMode}
              onAdd={addScheduleEvent}
              onUpdate={updateScheduleEvent}
              onDelete={deleteScheduleEvent}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
