import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export default function UserModeView({ profile }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key="user-mode"
      initial={reduceMotion ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-electric-300">
        Modo Usuario
      </p>

      <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
        {profile.visibleName}
      </h1>

      <p className="mt-4 text-lg font-semibold text-slate-300 sm:text-xl">
        {profile.title}
      </p>

      <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
        {profile.phrase}
      </p>

      <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 text-sm font-medium text-emerald-300">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.75)]"
        />

        {profile.availability}
      </div>

      <a
        href={profile.primaryAction.target}
        className="mt-9 inline-flex items-center gap-2 rounded-full bg-electric-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-electric transition hover:-translate-y-0.5 hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
      >
        {profile.primaryAction.label}
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </motion.div>
  )
}