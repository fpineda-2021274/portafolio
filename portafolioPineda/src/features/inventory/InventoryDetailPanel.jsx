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

function SkillDetailContent({ skill }) {
  const reduceMotion = useReducedMotion()
  const Icon = iconMap[skill.icon] ?? Puzzle

  return (
    <motion.div
      key={skill.id}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl border border-electric-400/35 bg-electric-400/12 text-electric-300 shadow-electric">
          <Icon aria-hidden="true" size={29} strokeWidth={1.6} />
        </span>

        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            Elemento seleccionado
          </p>

          <h3 className="mt-1 wrap-break-word text-xl font-black text-white">
            {skill.name}
          </h3>
        </div>
      </div>

      <dl className="mt-7 space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/2.5 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Nombre
          </dt>

          <dd className="mt-2 text-base font-bold text-slate-100">
            {skill.name}
          </dd>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/2.5 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Nivel
          </dt>

          <dd className="mt-2 font-mono text-2xl font-black text-electric-300">
            {skill.level}%
          </dd>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/2.5 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Categoría
          </dt>

          <dd className="mt-2 text-base leading-7 text-slate-200">
            {skill.category}
          </dd>
        </div>
      </dl>
    </motion.div>
  )
}

export default function InventoryDetailPanel({
  skill,
  compact = false,
}) {
  if (compact) {
    return <SkillDetailContent skill={skill} />
  }

  return (
    <aside
      aria-label="Detalle de habilidad seleccionada"
      className="sticky top-28 hidden rounded-3xl border border-electric-400/20 bg-surface-950/90 p-6 shadow-2xl shadow-black/35 lg:block"
    >
      <SkillDetailContent skill={skill} />
    </aside>
  )
}