import { Code2 } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import SocialDock from '../features/dock/SocialDock.jsx'
import usePerspectiveMode from '../features/perspective/usePerspectiveMode.jsx'
import { navigationItems } from './routeConfig.jsx'

function getNavigationClassName({ isActive }) {
  const baseClasses =
    'rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400'

  return isActive
    ? `${baseClasses} bg-electric-400/15 text-electric-300`
    : `${baseClasses} text-slate-400 hover:bg-white/5 hover:text-slate-100`
}

export default function AppShell() {
  const { mode } = usePerspectiveMode()

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      data-perspective={mode}
    >
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-electric-400 px-4 py-2 font-semibold text-slate-950 transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <header className="border-b border-white/8 bg-surface-950/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <NavLink
            to="/"
            className="inline-flex items-center gap-3 text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
            aria-label="Ir al inicio del portafolio"
          >
            <span className="grid size-10 place-items-center rounded-xl border border-electric-400/30 bg-electric-400/10 text-electric-300 shadow-electric">
              <Code2 aria-hidden="true" size={20} />
            </span>

            <span>
              <span className="block text-sm font-semibold tracking-[0.18em]">
                FRANKLIN PINEDA
              </span>

              <span className="block text-xs text-slate-500">
                Full Stack Junior
              </span>
            </span>
          </NavLink>

          <nav aria-label="Navegación principal">
            <ul className="flex flex-wrap items-center gap-1">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={getNavigationClassName}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className="relative isolate"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_60%)]"
        />

        <Outlet />
      </main>

      <footer className="border-t border-white/8 px-4 pb-28 pt-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
        FRANKLIN PINEDA · FULL STACK JUNIOR
      </footer>

      <SocialDock />
    </div>
  )
}