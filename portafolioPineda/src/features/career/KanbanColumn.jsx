import {
  BookOpenCheck,
  CodeXml,
  Layers3,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import CareerCard from './CareerCard.jsx'

const columnIconMap = {
  foundation: BookOpenCheck,
  specialization: Layers3,
  practice: CodeXml,
}

export default function KanbanColumn({ column, index }) {
  const reduceMotion = useReducedMotion()
  const Icon = columnIconMap[column.icon] ?? BookOpenCheck
  const headingId = `career-column-${column.id}`

  return (
    <motion.li
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: index === 0 ? -18 : index === 2 ? 18 : 0,
              y: index === 1 ? 18 : 0,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex min-w-0 flex-col"
    >
      <div className="relative z-10 mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-surface-950/80 p-4 shadow-xl shadow-black/20">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-electric-400/30 bg-electric-400/10 text-electric-300 shadow-electric">
          <Icon aria-hidden="true" size={22} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-mono text-xs font-bold text-electric-300">
              {column.year}
            </p>

            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-600">
              Etapa 0{index + 1}
            </span>
          </div>

          <h3
            id={headingId}
            className="mt-1 text-lg font-black tracking-tight text-white"
          >
            {column.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {column.subtitle}
          </p>
        </div>
      </div>

      <div className="flex-1">
        <CareerCard column={column} index={index} />
      </div>
    </motion.li>
  )
}