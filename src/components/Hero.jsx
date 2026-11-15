import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

function getTimeLeft() {
  const target = new Date('2027-02-12T10:00:00')
  const now = new Date()
  const diff = target - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
    done: false,
  }
}

function FlipDigit({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="glass relative overflow-hidden flex items-center justify-center"
        style={{
          width: 'clamp(72px, 10vw, 100px)',
          height: 'clamp(80px, 11vw, 110px)',
          borderRadius: 14,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-display font-semibold tab-nums absolute"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(170deg, #E8C97A 0%, #C9972F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* subtle separator line */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: '50%',
            height: 1,
            background: 'rgba(201,151,47,0.15)',
          }}
        />
      </div>
      <span
        className="font-body uppercase tracking-widest"
        style={{ fontSize: '0.6rem', color: 'rgba(184,168,138,0.6)' }}
      >
        {label}
      </span>
    </div>
  )
}

function MandalaRing({ r, dasharray, duration, reverse, opacity = 0.35 }) {
  return (
    <circle
      cx="50%"
      cy="50%"
      r={r}
      fill="none"
      stroke="#C9972F"
      strokeOpacity={opacity}
      strokeWidth={1}
      strokeDasharray={dasharray}
      style={{
        transformOrigin: '50% 50%',
        animation: `${reverse ? 'spin-reverse' : 'spin'} ${duration}s linear infinite`,
      }}
    />
  )
}

export default function Hero() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(126,39,135,0.2) 0%, transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(201,151,47,0.08) 0%, transparent 50%), linear-gradient(180deg, #0C0919 0%, #0E0A1E 100%)' }}
    >
      {/* Mandala rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
        aria-hidden="true"
      >
        <MandalaRing r="38%" dasharray="4 8"  duration={40} reverse={false} opacity={0.25} />
        <MandalaRing r="42%" dasharray="1 12" duration={28} reverse={true}  opacity={0.18} />
        <MandalaRing r="47%" dasharray="6 10" duration={55} reverse={false} opacity={0.14} />
        <MandalaRing r="52%" dasharray="2 15" duration={35} reverse={true}  opacity={0.10} />
      </svg>

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 3 === 0 ? '#C9972F' : i % 3 === 1 ? '#7E2787' : '#E8C97A',
            opacity: 0.25 + (i % 4) * 0.08,
            left:  `${8 + (i * 7) % 85}%`,
            top:   `${10 + (i * 11) % 75}%`,
          }}
          animate={{
            y: [0, -18 - (i % 5) * 4, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-eyebrow mb-6 tracking-[0.3em]"
        >
          Marathi Deshasth Rigvedi · Vivah Sohala
        </motion.div>

        {/* Couple names */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display font-semibold leading-tight mb-3 text-shadow-gold"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', color: '#F5EDD6' }}
        >
          Pranav{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #C9972F 0%, #E8C97A 50%, #C9972F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            &
          </span>{' '}
          Renuka
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display italic mb-1"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'rgba(184,168,138,0.7)' }}
        >
          Kulkarni Family
        </motion.p>

        {/* Date & venue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          style={{ color: 'rgba(245,237,214,0.55)', fontSize: '0.875rem' }}
        >
          <span className="font-body">12 February 2027</span>
          <span style={{ color: '#C9972F' }}>·</span>
          <span className="font-body">Coco Resort, Punawale, Pune</span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex items-end gap-3 sm:gap-4"
        >
          {time.done ? (
            <div
              className="font-display text-3xl sm:text-4xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #C9972F, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              The wedding day is here! 🎊
            </div>
          ) : (
            <>
              <FlipDigit value={time.days}    label="Days"    />
              <span className="font-display text-2xl mb-10" style={{ color: 'rgba(201,151,47,0.5)' }}>:</span>
              <FlipDigit value={time.hours}   label="Hours"   />
              <span className="font-display text-2xl mb-10" style={{ color: 'rgba(201,151,47,0.5)' }}>:</span>
              <FlipDigit value={time.minutes} label="Minutes" />
              <span className="font-display text-2xl mb-10" style={{ color: 'rgba(201,151,47,0.5)' }}>:</span>
              <FlipDigit value={time.seconds} label="Seconds" />
            </>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap gap-3 mt-10 justify-center"
        >
          <Link to="/schedule" className="btn-gold">View Schedule</Link>
          <Link to="/guests"
            className="px-5 py-2.5 rounded-lg text-sm font-medium font-body border transition-all duration-200"
            style={{ borderColor: 'rgba(201,151,47,0.3)', color: 'rgba(245,237,214,0.75)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,151,47,0.6)'; e.currentTarget.style.color='#F5EDD6'; e.currentTarget.style.background='rgba(201,151,47,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(201,151,47,0.3)'; e.currentTarget.style.color='rgba(245,237,214,0.75)'; e.currentTarget.style.background='' }}
          >
            Manage Guests
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs font-body tracking-widest uppercase" style={{ color: 'rgba(184,168,138,0.35)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'rgba(184,168,138,0.35)' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
