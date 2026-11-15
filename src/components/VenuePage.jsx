import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, BedDouble, Users, Clock, ExternalLink, Pencil } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'

function InfoRow({ icon: Icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid rgba(201,151,47,0.08)' }}>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'rgba(201,151,47,0.1)', border: '1px solid rgba(201,151,47,0.2)' }}
      >
        <Icon size={13} style={{ color: '#C9972F' }} />
      </div>
      <div>
        <div className="font-body text-xs mb-0.5" style={{ color: 'rgba(184,168,138,0.5)' }}>{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-cream hover:text-gold-light transition-colors flex items-center gap-1">
            {value} <ExternalLink size={10} />
          </a>
        ) : (
          <span className="font-body text-sm text-cream">{value}</span>
        )}
      </div>
    </div>
  )
}

function EditableInfoRow({ icon: Icon, label, fieldKey, value, editMode, onSave, type = 'text' }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid rgba(201,151,47,0.08)' }}>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'rgba(201,151,47,0.1)', border: '1px solid rgba(201,151,47,0.2)' }}
      >
        <Icon size={13} style={{ color: '#C9972F' }} />
      </div>
      <div className="flex-1">
        <div className="font-body text-xs mb-0.5" style={{ color: 'rgba(184,168,138,0.5)' }}>{label}</div>
        {editing ? (
          <input
            autoFocus
            type={type}
            className="input-dark w-full"
            value={val}
            onChange={e => setVal(e.target.value)}
            onBlur={() => { onSave(fieldKey, val); setEditing(false) }}
            onKeyDown={e => { if (e.key === 'Enter') { onSave(fieldKey, val); setEditing(false) } if (e.key === 'Escape') setEditing(false) }}
          />
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-cream">{value || <span style={{ color: 'rgba(184,168,138,0.35)', fontStyle: 'italic' }}>Not set</span>}</span>
            {editMode && (
              <button onClick={() => { setVal(value); setEditing(true) }} style={{ color: 'rgba(184,168,138,0.4)' }}>
                <Pencil size={11} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function VenuePage() {
  const { venue, editMode, updateVenue } = useWeddingStore()

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="section-eyebrow mb-2">Wedding Venue</div>
        <h2 className="section-title">{venue.name}</h2>
        <p className="font-body text-sm mt-2" style={{ color: 'rgba(184,168,138,0.6)' }}>{venue.address}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-display text-xl font-semibold text-cream mb-4">Venue Details</h3>

          <EditableInfoRow icon={MapPin}  label="Address"        fieldKey="address"       value={venue.address}       editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />
          <EditableInfoRow icon={Phone}   label="Phone"          fieldKey="phone"         value={venue.phone}         editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />
          <EditableInfoRow icon={Mail}    label="Email"          fieldKey="email"         value={venue.email}         editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />
          <EditableInfoRow icon={Users}   label="Contact Person" fieldKey="contactPerson" value={venue.contactPerson} editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />
          <EditableInfoRow icon={Clock}   label="Check-in"       fieldKey="checkIn"       value={venue.checkIn}       editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />
          <EditableInfoRow icon={Clock}   label="Check-out"      fieldKey="checkOut"      value={venue.checkOut}      editMode={editMode} onSave={(k,v) => updateVenue({ [k]: v })} />

          {venue.notes && (
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(201,151,47,0.06)', border: '1px solid rgba(201,151,47,0.15)' }}>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(184,168,138,0.65)' }}>{venue.notes}</p>
            </div>
          )}
        </motion.div>

        {/* Capacity & allocation */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-xl font-semibold text-cream mb-4">Guest Capacity</h3>

            <div className="space-y-4">
              {/* Event capacity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm text-cream">Wedding Day Capacity</span>
                  <span className="font-display text-xl font-semibold tab-nums" style={{ color: '#E8C97A' }}>{venue.eventCapacity}+</span>
                </div>
                <div className="glass rounded-xl p-3" style={{ background: 'rgba(201,151,47,0.05)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.6)' }}>Our target</span>
                    <span className="font-body text-xs font-semibold" style={{ color: '#E8C97A' }}>350–400 guests</span>
                  </div>
                </div>
              </div>

              {/* Stay rooms */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-sm text-cream">Stay Rooms</span>
                  <span className="font-display text-xl font-semibold tab-nums" style={{ color: '#B85CC0' }}>{venue.stayRooms} rooms</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Pranav's Side", count: 50, color: '#C9972F' },
                    { label: "Renuka's Side", count: 50, color: '#7E2787' },
                  ].map(side => (
                    <div key={side.label} className="glass rounded-xl p-3" style={{ borderColor: `${side.color}20` }}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-body text-xs font-medium" style={{ color: side.color }}>{side.label}</span>
                        <span className="font-body text-xs font-semibold tab-nums" style={{ color: side.color }}>{side.count} rooms</span>
                      </div>
                      <div className="progress-track">
                        <div className="h-full rounded-full" style={{ width: '50%', background: `linear-gradient(90deg, ${side.color}, ${side.color}70)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl overflow-hidden"
          >
            <iframe
              title="Coco Resort Punawale location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9898!2d73.7406!3d18.5906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc5a4d4b3c3%3A0x1234!2sCoco%20Resort%20Punawale!5e0!3m2!1sen!2sin!4v1699123456789!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, display: 'block', filter: 'invert(0.9) hue-rotate(200deg) saturate(0.5)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="font-body text-xs font-semibold text-cream">Coco Resort</div>
                <div className="font-body text-xs" style={{ color: 'rgba(184,168,138,0.5)' }}>Punawale, Pune</div>
              </div>
              <a
                href="https://maps.google.com/?q=Coco+Resort+Punawale+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs py-1.5 px-3 flex items-center gap-1"
              >
                <ExternalLink size={11} /> Open Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How to reach */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-6 mt-6"
      >
        <h3 className="font-display text-xl font-semibold text-cream mb-4">How to Reach</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { mode: '🚆 By Train', text: 'Pune Junction (25 km) · Chinchwad Station (8 km). Shuttle available from both stations.' },
            { mode: '✈️ By Air', text: 'Pune International Airport (20 km). Shuttle from airport on request. Pre-book by Feb 10.' },
            { mode: '🚗 By Road', text: 'Hinjewadi-Wakad Road, Punawale exit. Ample parking on premises for 100+ vehicles.' },
          ].map(r => (
            <div key={r.mode} className="p-3 rounded-xl" style={{ background: 'rgba(201,151,47,0.05)', border: '1px solid rgba(201,151,47,0.1)' }}>
              <div className="font-body text-sm font-semibold text-cream mb-1">{r.mode}</div>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(184,168,138,0.65)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
