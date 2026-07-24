import { Code2, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import usePerspectiveMode from './usePerspectiveMode.jsx'

export default function PerspectiveSwitch() {
  const reduceMotion = useReducedMotion()
  const { isDeveloperMode, toggleMode } = usePerspectiveMode()

  return (
    <div className="w-full max-w-xl">
      <p
        id="perspective-switch-label"
        className="mb-4 text-center text-sm font-semibold tracking-wide text-slate-300"
      >
        ¿Modo Usuario o Modo Desarrollador?
      </p>

      <button
        type="button"
        role="switch"
        aria-checked={isDeveloperMode}
        aria-labelledby="perspective-switch-label"
        onClick={toggleMode}
        className="relative grid w-full grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-surface-900/90 p-1.5 shadow-2xl shadow-black/30 transition-colors hover:border-electric-400/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl border border-electric-400/25 bg-electric-400/12 shadow-electric"
          animate={{ x: isDeveloperMode ? '100%' : '0%' }}
          transition={{
            duration: reduceMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <span
          className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors sm:px-5 ${
            isDeveloperMode ? 'text-slate-500' : 'text-electric-300'
          }`}
        >
          <UserRound aria-hidden="true" size={18} />
          <span>Modo Usuario</span>
        </span>

        <span
          className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors sm:px-5 ${
            isDeveloperMode ? 'text-electric-300' : 'text-slate-500'
          }`}
        >
          <Code2 aria-hidden="true" size={18} />
          <span>Modo Desarrollador</span>
        </span>
      </button>
    </div>
  )
}