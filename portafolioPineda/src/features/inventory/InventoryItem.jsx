import {
  Database,
  LayoutTemplate,
  Puzzle,
  ServerCog,
  UsersRound,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const iconMap = {
  layout: LayoutTemplate,
  database: Database,
  users: UsersRound,
  server: ServerCog,
  puzzle: Puzzle,
}

export default function InventoryItem({
  skill,
  selected,
  onSelect,
}) {
  const reduceMotion = useReducedMotion()
  const Icon = iconMap[skill.icon] ?? Puzzle

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={`Seleccionar ${skill.name}, nivel ${skill.level}%`}
      onClick={() => onSelect(skill)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -7,
              rotateX: 4,
              rotateY: -4,
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{
        duration: reduceMotion ? 0 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      className={`group relative min-h-56 overflow-hidden rounded-3xl border p-5 text-left shadow-2xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400 sm:p-6 ${
        selected
          ? 'border-electric-400/50 bg-electric-400/10 shadow-[0_18px_60px_rgba(14,165,233,0.16)]'
          : 'border-white/10 bg-white/3 shadow-black/25 hover:border-electric-400/30 hover:bg-white/5'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.16),transparent_35%)] opacity-70"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-electric-300/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <motion.span
            aria-hidden="true"
            className={`relative grid size-16 place-items-center rounded-2xl border shadow-2xl ${
              selected
                ? 'border-electric-300/50 bg-electric-400/18 text-electric-300 shadow-electric'
                : 'border-white/10 bg-surface-900 text-slate-300 shadow-black/40 group-hover:border-electric-400/35 group-hover:text-electric-300'
            }`}
            style={{
              transform: 'translateZ(34px)',
            }}
            animate={
              selected && !reduceMotion
                ? {
                    rotateY: [0, 8, 0, -8, 0],
                  }
                : undefined
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-1 rounded-xl border border-white/5"
            />

            <Icon size={29} strokeWidth={1.6} />
          </motion.span>

          <span className="rounded-full border border-white/10 bg-surface-950/70 px-3 py-1.5 font-mono text-xs font-bold text-electric-300">
            {skill.level}%
          </span>
        </div>

        <div
          className="mt-auto pt-8"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
            {skill.name}
          </h3>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-950">
            <motion.div
              aria-hidden="true"
              className="h-full rounded-full bg-linear-to-r from-electric-600 via-electric-400 to-electric-300 shadow-[0_0_14px_rgba(56,189,248,0.55)]"
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{
                width: `${skill.level}%`,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>
    </motion.button>
  )
}