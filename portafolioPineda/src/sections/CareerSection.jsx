import { Columns3 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import career from '../content/career.json'
import CareerKanban from '../features/career/CareerKanban.jsx'

export default function CareerSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="trayectoria"
      aria-labelledby="career-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_10%,rgba(56,189,248,0.08),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.018)_1px,transparent_1px)] bg-size-[56px_56px]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-electric-300">
            <Columns3 aria-hidden="true" size={18} />

            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              {career.eyebrow}
            </p>
          </div>

          <h2
            id="career-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {career.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            {career.description}
          </p>
        </motion.div>

        <CareerKanban columns={career.columns} />
      </div>
    </section>
  )
}