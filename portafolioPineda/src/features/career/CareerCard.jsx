import {
  Atom,
  Braces,
  CheckCircle2,
  Code2,
  Coffee,
  Database,
  FileCode2,
  GitBranch,
  ServerCog,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const technologyIconMap = {
  pseint: GitBranch,
  mysql: Database,
  java: Coffee,
  'spring boot': ServerCog,
  css: FileCode2,
  react: Atom,
  javascript: Braces,
}

function TechnologyBadge({ technology }) {
  const normalizedTechnology = technology.toLowerCase()
  const Icon = technologyIconMap[normalizedTechnology] ?? Code2

  return (
    <li className="inline-flex items-center gap-2 rounded-xl border border-electric-400/20 bg-electric-400/8 px-3 py-2 font-mono text-xs font-semibold text-electric-300">
      <Icon aria-hidden="true" size={14} />
      {technology}
    </li>
  )
}

export default function CareerCard({ column, index }) {
  const reduceMotion = useReducedMotion()
  const titleId = `career-card-${column.id}`

  return (
    <motion.article
      aria-labelledby={titleId}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/25 transition-colors hover:border-electric-400/30 hover:bg-white/4.5 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-electric-300/60 to-transparent opacity-60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 size-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-electric-400/[0.07] blur-3xl"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
              Tecnologías
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {column.technologies.length} elementos
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-surface-950/75 px-3 py-1.5 font-mono text-xs font-bold text-slate-400">
            {column.year}
          </span>
        </div>

        <ul
          aria-label={`Tecnologías utilizadas en ${column.year}`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {column.technologies.map((technology) => (
            <TechnologyBadge
              key={technology}
              technology={technology}
            />
          ))}
        </ul>
      </div>

      <div className="relative mt-7 flex-1 border-t border-white/8 pt-6">
        <h4
          id={titleId}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-300"
        >
          <CheckCircle2
            aria-hidden="true"
            size={17}
            className="text-electric-300"
          />

          Aprendizajes
        </h4>

        <ul className="mt-5 space-y-3">
          {column.learnings.map((learning) => (
            <li
              key={learning}
              className="flex items-start gap-3 text-sm leading-6 text-slate-400"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric-400 shadow-[0_0_10px_rgba(56,189,248,0.65)]"
              />

              <span>{learning}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}