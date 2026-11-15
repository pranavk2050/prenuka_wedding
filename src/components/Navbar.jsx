import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Lock, Menu, X, Download, FileText } from 'lucide-react'
import useWeddingStore from '../store/useWeddingStore'
import SyncIndicator from './SyncIndicator'
import { exportFullPDF } from '../utils/exportPDF'

const links = [
  { to: '/',         label: 'Dashboard' },
  { to: '/schedule', label: 'Schedule'  },
  { to: '/guests',   label: 'Guests'    },
  { to: '/tasks',    label: 'Tasks'     },
  { to: '/budget',   label: 'Budget'    },
  { to: '/vendors',  label: 'Vendors'   },
  { to: '/venue',    label: 'Venue'     },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const store = useWeddingStore()
  const { editMode, toggleEditMode, exportData } = store

  function handleExport() {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pranav-renuka-wedding-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(12,9,25,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,151,47,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <span
              className="font-display text-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #C9972F, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              P ✦ R
            </span>
            <span className="text-xs font-body text-cream-muted hidden sm:block tracking-wide">
              12 Feb 2027
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium font-body transition-all duration-200 ${
                    isActive
                      ? 'text-gold-light bg-gold-subtle'
                      : 'text-cream-muted hover:text-cream hover:bg-white/5'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(201,151,47,0.1)' : undefined,
                  color: isActive ? '#E8C97A' : undefined,
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportFullPDF(store)}
              title="Export PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body transition-all duration-200"
              style={{ color: 'rgba(184,168,138,0.7)', border: '1px solid rgba(201,151,47,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.4)'; e.currentTarget.style.color = '#E8C97A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.15)'; e.currentTarget.style.color = 'rgba(184,168,138,0.7)' }}
            >
              <FileText size={13} /> PDF
            </button>
            <button
              onClick={handleExport}
              title="Export JSON Backup"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body transition-all duration-200"
              style={{ color: 'rgba(184,168,138,0.7)', border: '1px solid rgba(201,151,47,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.4)'; e.currentTarget.style.color = '#E8C97A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,151,47,0.15)'; e.currentTarget.style.color = 'rgba(184,168,138,0.7)' }}
            >
              <Download size={13} /> Backup
            </button>
<SyncIndicator />

            <button
              onClick={toggleEditMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-all duration-200"
              style={
                editMode
                  ? { background: 'rgba(201,151,47,0.15)', color: '#E8C97A', border: '1px solid rgba(201,151,47,0.4)' }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(184,168,138,0.7)', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              {editMode ? <Lock size={13} /> : <Pencil size={13} />}
              <span className="hidden sm:inline">{editMode ? 'Lock' : 'Edit'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'rgba(245,237,214,0.6)' }}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Edit mode banner */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ background: 'rgba(201,151,47,0.08)', borderTop: '1px solid rgba(201,151,47,0.2)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse" />
              <span className="text-xs font-body" style={{ color: '#E8C97A' }}>
                Edit mode is active — changes are saved automatically and synced across devices
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
            style={{ background: 'rgba(12,9,25,0.95)', borderTop: '1px solid rgba(201,151,47,0.1)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-body ${isActive ? 'text-gold-light' : 'text-cream-muted'}`
                  }
                  style={({ isActive }) => ({ color: isActive ? '#E8C97A' : undefined })}
                >
                  {l.label}
                </NavLink>
              ))}
              <hr className="divider my-2" />
              <div className="flex gap-2">
                <button onClick={() => exportFullPDF(store)} className="flex-1 btn-ghost text-xs py-2 flex items-center justify-center gap-1">
                  <FileText size={12} /> PDF
                </button>
                <button onClick={handleExport} className="flex-1 btn-ghost text-xs py-2 flex items-center justify-center gap-1">
                  <Download size={12} /> Backup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
