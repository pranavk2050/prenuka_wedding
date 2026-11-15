import { motion, AnimatePresence } from 'framer-motion'
import { useUserName } from '../hooks/useUserName'

export default function UserNameModal() {
  const [name, setName] = useUserName()

  if (name) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        style={{ background: 'rgba(12,9,25,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
          className="glass rounded-3xl p-8 sm:p-12 max-w-sm w-full text-center"
        >
          <div className="text-4xl mb-4">💍</div>
          <h2 className="font-display text-3xl font-semibold text-cream mb-2">
            Welcome!
          </h2>
          <p className="font-body text-sm mb-8" style={{ color: 'rgba(184,168,138,0.65)' }}>
            Who are you? This helps us track who made each change.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setName('Pranav')}
              className="w-full py-4 rounded-2xl font-display text-xl font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(201,151,47,0.15), rgba(232,201,122,0.1))',
                border: '1px solid rgba(201,151,47,0.4)',
                color: '#E8C97A',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,151,47,0.25), rgba(232,201,122,0.15))' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,151,47,0.15), rgba(232,201,122,0.1))' }}
            >
              Pranav
            </button>
            <button
              onClick={() => setName('Renuka')}
              className="w-full py-4 rounded-2xl font-display text-xl font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(126,39,135,0.15), rgba(184,92,192,0.1))',
                border: '1px solid rgba(126,39,135,0.4)',
                color: '#B85CC0',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(126,39,135,0.25), rgba(184,92,192,0.15))' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(126,39,135,0.15), rgba(184,92,192,0.1))' }}
            >
              Renuka
            </button>
          </div>

          <p className="font-body text-xs mt-6" style={{ color: 'rgba(184,168,138,0.35)' }}>
            Saved on this device only
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
