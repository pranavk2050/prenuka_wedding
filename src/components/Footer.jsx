import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="mt-20 py-10 text-center"
      style={{ borderTop: '1px solid rgba(201,151,47,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="font-display text-2xl mb-2"
          style={{
            background: 'linear-gradient(135deg, #C9972F, #E8C97A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Pranav ✦ Renuka
        </div>
        <p className="text-xs font-body mb-4" style={{ color: 'rgba(184,168,138,0.5)' }}>
          12 February 2027 · Coco Resort, Punawale, Pune
        </p>
        <p className="text-xs font-body flex items-center justify-center gap-1" style={{ color: 'rgba(184,168,138,0.35)' }}>
          Made with <Heart size={10} className="text-paithani" fill="currentColor" /> for a lifetime together
        </p>
      </div>
    </footer>
  )
}
