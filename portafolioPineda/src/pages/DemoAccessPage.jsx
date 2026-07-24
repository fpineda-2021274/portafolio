import {
  ArrowRight,
  CircleCheck,
  HardDrive,
  KeyRound,
  LockKeyhole,
  LogIn,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
} from 'motion/react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import useDemoSession from '../features/access/useDemoSession.jsx'

const accessFeatures = [
  {
    id: 'local',
    title: 'Persistencia local',
    description:
      'La sesión se almacena únicamente en el navegador.',
    icon: HardDrive,
  },
  {
    id: 'protected',
    title: 'Ruta protegida',
    description:
      'El laboratorio requiere una sesión activa.',
    icon: ShieldCheck,
  },
  {
    id: 'credentials',
    title: 'Sin credenciales',
    description:
      'El acceso no solicita usuarios ni contraseñas.',
    icon: KeyRound,
  },
]

function getDestination(locationState) {
  const requestedPath = locationState?.from

  if (
    typeof requestedPath === 'string' &&
    requestedPath.startsWith('/developer-lab')
  ) {
    return requestedPath
  }

  return '/developer-lab'
}

export default function DemoAccessPage() {
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    isAuthenticated,
    activateSession,
    deactivateSession,
  } = useDemoSession()

  const destination = getDestination(location.state)

  function handleActivateSession() {
    const sessionActivated = activateSession()

    if (sessionActivated) {
      navigate(destination, {
        replace: true,
      })
    }
  }

  function handleContinue() {
    navigate('/developer-lab')
  }

  function handleDeactivateSession() {
    deactivateSession()
  }

  return (
    <section
      aria-labelledby="demo-access-title"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_25%_25%,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_80%_75%,rgba(14,165,233,0.08),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-size-[52px_52px]"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -24,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="inline-flex items-center gap-2 text-electric-300">
            <LockKeyhole
              aria-hidden="true"
              size={18}
            />

            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              Acceso controlado
            </p>
          </div>

          <h1
            id="demo-access-title"
            className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Sesión de demostración
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Acceso local para visualizar una ruta protegida
            sin conexión con servicios externos.
          </p>

          <div
            aria-live="polite"
            className={`mt-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold ${
              isAuthenticated
                ? 'border-emerald-400/25 bg-emerald-400/8 text-emerald-300'
                : 'border-amber-400/25 bg-amber-400/8 text-amber-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${
                isAuthenticated
                  ? 'bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]'
                  : 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]'
              }`}
            />

            {isAuthenticated
              ? 'Sesión activa'
              : 'Sesión inactiva'}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 rounded-full bg-electric-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-electric transition hover:-translate-y-0.5 hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
                >
                  Abrir laboratorio
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                  />
                </button>

                <button
                  type="button"
                  onClick={handleDeactivateSession}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-bold text-slate-300 transition hover:border-red-400/30 hover:bg-red-400/8 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
                >
                  <LogOut
                    aria-hidden="true"
                    size={18}
                  />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleActivateSession}
                className="inline-flex items-center gap-2 rounded-full bg-electric-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-electric transition hover:-translate-y-0.5 hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
              >
                <LogIn
                  aria-hidden="true"
                  size={18}
                />
                Activar acceso
              </button>
            )}
          </div>
        </motion.div>

        <motion.aside
          aria-label="Características del acceso"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 24,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden rounded-3xl border border-electric-400/20 bg-surface-950/85 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-300">
                demo.session
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Configuración local
              </p>
            </div>

            <CircleCheck
              aria-hidden="true"
              size={20}
              className={
                isAuthenticated
                  ? 'text-emerald-300'
                  : 'text-slate-600'
              }
            />
          </div>

          <ul className="space-y-3 p-5 sm:p-6">
            {accessFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <li
                  key={feature.id}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-white/2.5 p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-electric-400/20 bg-electric-400/8 text-electric-300">
                    <Icon
                      aria-hidden="true"
                      size={20}
                    />
                  </span>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {feature.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </motion.aside>
      </div>
    </section>
  )
}