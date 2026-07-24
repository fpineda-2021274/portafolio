import {
  ArrowDown,
  CheckCircle2,
  Code2,
  Terminal,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const buildIndicators = [
  {
    label: 'components',
    value: 'loaded',
  },
  {
    label: 'interface',
    value: 'ready',
  },
  {
    label: 'runtime',
    value: 'stable',
  },
]

export default function DeveloperModeView({ profile }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key="developer-mode"
      initial={reduceMotion ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-electric-300">
          <Terminal aria-hidden="true" size={16} />
          Developer Mode
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1 font-mono text-xs text-emerald-300">
          <CheckCircle2 aria-hidden="true" size={14} />
          system.ready
        </div>
      </div>

      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-950/80 shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-red-400/70"
          />

          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-amber-400/70"
          />

          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-emerald-400/70"
          />

          <span className="ml-2 font-mono text-[0.65rem] text-slate-500">
            profile.runtime.jsx
          </span>
        </div>

        <div className="overflow-x-auto p-4 font-mono text-xs leading-6 sm:p-5 sm:text-sm">
          <p>
            <span className="text-fuchsia-300">const</span>{' '}
            <span className="text-electric-300">developer</span>{' '}
            <span className="text-slate-400">=</span>{' '}
            <span className="text-slate-500">{'{'}</span>
          </p>

          <p className="pl-4">
            <span className="text-slate-300">name:</span>{' '}
            <span className="text-emerald-300">
              &quot;{profile.fullName}&quot;
            </span>
            ,
          </p>

          <p className="pl-4">
            <span className="text-slate-300">role:</span>{' '}
            <span className="text-emerald-300">
              &quot;{profile.title}&quot;
            </span>
            ,
          </p>

          <p className="pl-4">
            <span className="text-slate-300">status:</span>{' '}
            <span className="text-emerald-300">
              &quot;system.ready&quot;
            </span>
          </p>

          <p className="text-slate-500">{'}'}</p>
        </div>
      </div>

      <h1 className="mt-7 break-all font-mono text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
        {profile.developerName}
      </h1>

      <p className="mt-4 font-mono text-sm text-electric-300 sm:text-base">
        role: &quot;{profile.title}&quot;
      </p>

      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
        {profile.phrase}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {profile.technologyBadges.map((technology) => (
          <span
            key={technology}
            className="inline-flex items-center gap-2 rounded-lg border border-electric-400/20 bg-electric-400/8 px-3 py-2 font-mono text-xs text-electric-300"
          >
            <Code2 aria-hidden="true" size={14} />
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-7 grid w-full gap-2 sm:grid-cols-3">
        {buildIndicators.map((indicator) => (
          <div
            key={indicator.label}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/2.5 px-3 py-2 font-mono text-[0.68rem]"
          >
            <span className="text-slate-500">
              {indicator.label}
            </span>

            <span className="text-emerald-300">
              {indicator.value}
            </span>
          </div>
        ))}
      </div>

      <a
        href={profile.primaryAction.target}
        className="mt-9 inline-flex items-center gap-2 rounded-full border border-electric-400/35 bg-electric-400/12 px-6 py-3.5 font-mono text-sm font-bold text-electric-300 shadow-electric transition hover:-translate-y-0.5 hover:bg-electric-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
      >
        {profile.primaryAction.label}
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </motion.div>
  )
}