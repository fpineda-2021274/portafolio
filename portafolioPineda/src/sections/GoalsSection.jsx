import {
  Building2,
  Code2,
  GraduationCap,
  Rocket,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import goals from '../content/goals.json'

const iconMap = {
  graduation: GraduationCap,
  development: Code2,
  agency: Building2,
}

const accentStyles = [
  {
    number:
      'border-sky-400/30 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.16)]',
    icon: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
    badge: 'border-sky-400/20 bg-sky-400/8 text-sky-300',
    line: 'from-sky-400/60',
  },
  {
    number:
      'border-blue-400/30 bg-blue-400/10 text-blue-300 shadow-[0_0_30px_rgba(96,165,250,0.16)]',
    icon: 'border-blue-400/25 bg-blue-400/10 text-blue-300',
    badge: 'border-blue-400/20 bg-blue-400/8 text-blue-300',
    line: 'from-blue-400/60',
  },
  {
    number:
      'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.16)]',
    icon: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
    badge: 'border-cyan-400/20 bg-cyan-400/8 text-cyan-300',
    line: 'from-cyan-400/60',
  },
]

function GoalCard({ goal, index }) {
  const reduceMotion = useReducedMotion()
  const Icon = iconMap[goal.icon] ?? Rocket
  const styles = accentStyles[index] ?? accentStyles[0]

  return (
    <motion.li
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
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
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-full flex-col"
    >
      <div className="relative z-10 mb-6 flex items-center gap-4 lg:flex-col lg:gap-5">
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-2xl border font-mono text-sm font-black ${styles.number}`}
        >
          0{index + 1}
        </span>

        <div className="min-w-0 lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            {goal.period}
          </p>

          <p className="mt-1 font-mono text-xs text-slate-600">
            horizonte.{goal.shortPeriod.replace(' ', '_')}
          </p>
        </div>
      </div>

      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-electric-400/25 hover:bg-white/4.5 sm:p-7">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${styles.line} via-electric-300/30 to-transparent`}
        />

        <div
          className={`grid size-12 place-items-center rounded-2xl border transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon aria-hidden="true" size={22} />
        </div>

        <h3 className="mt-6 text-xl font-black tracking-tight text-white sm:text-2xl">
          {goal.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-slate-400 sm:text-base">
          {goal.description}
        </p>

        <ul
          aria-label={`Áreas de enfoque para ${goal.period.toLowerCase()}`}
          className="mt-7 flex flex-wrap gap-2"
        >
          {goal.focusAreas.map((focusArea) => (
            <li
              key={focusArea}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${styles.badge}`}
            >
              {focusArea}
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  )
}

export default function GoalsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="aspiraciones"
      aria-labelledby="goals-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-168 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-400/[0.035] blur-3xl"
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
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-electric-300">
            {goals.eyebrow}
          </p>

          <h2
            id="goals-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {goals.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            {goals.description}
          </p>
        </motion.div>

        <div className="relative mt-14 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-linear-to-b from-electric-400/40 via-electric-400/15 to-transparent sm:block lg:left-[16.66%] lg:right-[16.66%] lg:top-7 lg:h-px lg:w-auto lg:bg-linear-to-r"
          />

          <ol className="grid gap-8 sm:gap-10 lg:grid-cols-3 lg:gap-7">
            {goals.items.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                index={index}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}