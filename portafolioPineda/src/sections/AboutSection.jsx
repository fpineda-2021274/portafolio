import { motion, useReducedMotion } from 'motion/react'

import profile from '../content/profile.json'
import ProfileColumns from '../features/profile/ProfileColumns.jsx'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-t border-white/8 py-20 sm:py-24 lg:py-28"
    >
      <motion.div
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
          amount: 0.12,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-electric-300">
            Perfil profesional
          </p>

          <h2
            id="about-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Sobre mí
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            Información académica, profesional y de contacto presentada
            en una interfaz estructurada.
          </p>
        </div>

        <ProfileColumns profile={profile} />
      </motion.div>
    </section>
  )
}