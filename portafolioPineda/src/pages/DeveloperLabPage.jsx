import {
  Braces,
  CheckCircle2,
  Code2,
  Database,
  HardDrive,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
} from 'motion/react'
import { useNavigate } from 'react-router-dom'

import useDemoSession from '../features/access/useDemoSession.jsx'

const labModules = [
  {
    id: 'protected-route',
    title: 'ProtectedRoute',
    value: 'enabled',
    description:
      'Validación de sesión antes de renderizar la página.',
    icon: ShieldCheck,
  },
  {
    id: 'local-storage',
    title: 'localStorage',
    value: 'connected',
    description:
      'Persistencia de la sesión dentro del navegador.',
    icon: HardDrive,
  },
  {
    id: 'backend',
    title: 'Backend',
    value: 'not_required',
    description:
      'Demostración completamente frontend.',
    icon: Database,
  },
]

export default function DeveloperLabPage() {
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const { deactivateSession } = useDemoSession()

  function handleCloseSession() {
    deactivateSession()

    navigate('/demo-access', {
      replace: true,
    })
  }

  return (
    <section
      aria-labelledby="developer-lab-title"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_5%,rgba(56,189,248,0.14),transparent_35%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-size-[42px_42px]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-electric-300">
              <Terminal
                aria-hidden="true"
                size={18}
              />

              <p className="font-mono text-sm font-semibold uppercase tracking-[0.28em]">
                Protected environment
              </p>
            </div>

            <h1
              id="developer-lab-title"
              className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Developer Lab
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
              Entorno de demostración accesible mediante una
              sesión local activa.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseSession}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-red-400/25 bg-red-400/8 px-5 py-3 text-sm font-bold text-red-300 transition hover:border-red-400/45 hover:bg-red-400/12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
          >
            <LogOut
              aria-hidden="true"
              size={18}
            />
            Cerrar sesión
          </button>
        </motion.header>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 overflow-hidden rounded-3xl border border-electric-400/20 bg-surface-950/90 shadow-2xl shadow-black/40"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <LockKeyhole
                aria-hidden="true"
                size={18}
                className="text-electric-300"
              />

              <span className="font-mono text-xs text-slate-400">
                route://developer-lab
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1.5 font-mono text-xs text-emerald-300">
              <CheckCircle2
                aria-hidden="true"
                size={14}
              />
              access.granted
            </span>
          </div>

          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
            {labModules.map((module, index) => {
              const Icon = module.icon

              return (
                <motion.article
                  key={module.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion
                      ? 0
                      : 0.18 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 size-28 translate-x-1/3 -translate-y-1/3 rounded-full bg-electric-400/8 blur-2xl"
                  />

                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl border border-electric-400/25 bg-electric-400/10 text-electric-300">
                      <Icon
                        aria-hidden="true"
                        size={21}
                      />
                    </span>

                    <h2 className="mt-5 text-lg font-black text-white">
                      {module.title}
                    </h2>

                    <p className="mt-2 font-mono text-xs text-emerald-300">
                      status: {module.value}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {module.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : 0.32,
          }}
          className="mt-8 grid gap-6 rounded-3xl border border-white/8 bg-white/2 p-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-electric-300">
              <Code2
                aria-hidden="true"
                size={17}
              />

              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Session state
              </h2>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              La sesión permanece activa durante la navegación y
              después de recargar la página.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-surface-950 p-5 font-mono text-sm leading-7">
            <p>
              <span className="text-fuchsia-300">
                const
              </span>{' '}
              <span className="text-electric-300">
                session
              </span>{' '}
              <span className="text-slate-400">=</span>{' '}
              <span className="text-slate-500">{'{'}</span>
            </p>

            <p className="pl-4">
              <span className="text-sky-300">
                protected
              </span>
              :{' '}
              <span className="text-fuchsia-300">
                true
              </span>
              ,
            </p>

            <p className="pl-4">
              <span className="text-sky-300">
                storage
              </span>
              :{' '}
              <span className="text-emerald-300">
                &quot;localStorage&quot;
              </span>
              ,
            </p>

            <p className="pl-4">
              <span className="text-sky-300">
                backend
              </span>
              :{' '}
              <span className="text-fuchsia-300">
                false
              </span>
            </p>

            <p className="text-slate-500">{'}'}</p>

            <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4 text-emerald-300">
              <Braces
                aria-hidden="true"
                size={16}
              />
              session.ready
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}