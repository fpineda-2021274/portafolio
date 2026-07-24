import { AnimatePresence } from 'motion/react'

import profile from '../content/profile.json'
import DeveloperModeView from '../features/perspective/DeveloperModeView.jsx'
import PerspectiveSwitch from '../features/perspective/PerspectiveSwitch.jsx'
import UserModeView from '../features/perspective/UserModeView.jsx'
import usePerspectiveMode from '../features/perspective/usePerspectiveMode.jsx'
import ProfileAvatar from '../features/profile/ProfileAvatar.jsx'

export default function WelcomeSection() {
  const { isDeveloperMode } = usePerspectiveMode()

  return (
    <section
      id="inicio"
      aria-labelledby="welcome-title"
      className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(56,189,248,0.08),transparent_30%)]"
      />

      {isDeveloperMode && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-size-[54px_54px]"
        />
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-12">
          <PerspectiveSwitch />

          <div
            className={`grid w-full gap-14 rounded-4xl border p-6 transition-colors sm:p-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:p-12 ${
              isDeveloperMode
                ? 'border-electric-400/20 bg-surface-900/75 shadow-[0_0_80px_rgba(14,165,233,0.08)]'
                : 'border-white/8 bg-white/2 shadow-2xl shadow-black/20'
            }`}
          >
            <div>
              <span id="welcome-title" className="sr-only">
                Bienvenida al portafolio
              </span>

              <AnimatePresence mode="wait" initial={false}>
                {isDeveloperMode ? (
                  <DeveloperModeView profile={profile} />
                ) : (
                  <UserModeView profile={profile} />
                )}
              </AnimatePresence>
            </div>

            <ProfileAvatar
              avatar={profile.avatar}
              developerMode={isDeveloperMode}
            />
          </div>
        </div>
      </div>
    </section>
  )
}