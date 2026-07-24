import { Gamepad2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import skills from '../content/skills.json'
import TechnologyInventory from '../features/inventory/TechnologyInventory.jsx'

export default function SkillsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="habilidades"
      aria-labelledby="skills-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_25%,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(56,189,248,0.06),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.018)_1px,transparent_1px)] bg-size-[48px_48px]"
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
          className="mb-12 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-electric-300">
            <Gamepad2 aria-hidden="true" size={18} />

            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              {skills.eyebrow}
            </p>
          </div>

          <h2
            id="skills-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {skills.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            {skills.description}
          </p>
        </motion.div>

        <TechnologyInventory
          skills={skills.skills}
          technologies={skills.technologies}
        />
      </div>
    </section>
  )
}