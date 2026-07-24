import { CircuitBoard, Cpu, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

export default function ProfileAvatar({
  avatar,
  developerMode = false,
}) {
  const reduceMotion = useReducedMotion()
  const [imageFailed, setImageFailed] = useState(false)

  const showExternalImage =
    avatar?.useExternalImage &&
    avatar?.src &&
    !imageFailed

  return (
    <div className="relative mx-auto grid w-full max-w-md place-items-center">
      {developerMode && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-[4%] rounded-[2.75rem] border border-electric-400/20"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: [0, 1.5, 0, -1.5, 0],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-[10%] rounded-[2.25rem] border border-dashed border-electric-400/25"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div
            aria-hidden="true"
            className="absolute left-2 top-14 hidden items-center gap-2 rounded-lg border border-electric-400/20 bg-surface-950/90 px-3 py-2 font-mono text-[0.65rem] text-electric-300 shadow-electric sm:flex"
          >
            <Cpu size={13} />
            core.active
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-16 right-0 hidden items-center gap-2 rounded-lg border border-electric-400/20 bg-surface-950/90 px-3 py-2 font-mono text-[0.65rem] text-electric-300 shadow-electric sm:flex"
          >
            <CircuitBoard size={13} />
            ui.connected
          </div>

          <span
            aria-hidden="true"
            className="absolute left-[8%] top-[22%] size-2 rounded-full bg-electric-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
          />

          <span
            aria-hidden="true"
            className="absolute bottom-[18%] right-[9%] size-2 rounded-full bg-electric-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
          />
        </>
      )}

      <motion.div
        className={`relative aspect-square w-[78%] overflow-hidden rounded-[2.5rem] border ${
          developerMode
            ? 'border-electric-400/40 bg-surface-900 shadow-[0_0_70px_rgba(14,165,233,0.22)]'
            : 'border-white/10 bg-white/4 shadow-2xl shadow-black/30'
        }`}
        animate={
          reduceMotion
            ? undefined
            : {
                y: developerMode ? [0, -7, 0] : [0, -4, 0],
              }
        }
        transition={{
          duration: developerMode ? 4 : 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            developerMode
              ? 'bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.24),transparent_48%)]'
              : 'bg-[radial-gradient(circle_at_50%_25%,rgba(148,163,184,0.14),transparent_52%)]'
          }`}
        />

        {developerMode && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-size-[24px_24px]"
            />

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-electric-300 to-transparent shadow-[0_0_16px_rgba(125,211,252,0.9)]"
              animate={
                reduceMotion
                  ? { top: '50%' }
                  : {
                      top: ['12%', '88%', '12%'],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}

        <div className="relative grid h-full place-items-center p-[14%]">
          {showExternalImage ? (
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full rounded-4xl object-cover"
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              role="img"
              aria-label={avatar?.alt ?? 'Avatar tecnológico genérico'}
              className={`relative grid h-full w-full place-items-center rounded-4xl border ${
                developerMode
                  ? 'border-electric-400/25 bg-electric-400/10'
                  : 'border-white/10 bg-white/[0.035]'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-[12%] rounded-full border ${
                  developerMode
                    ? 'border-dashed border-electric-400/25'
                    : 'border-white/8'
                }`}
              />

              <UserRound
                aria-hidden="true"
                className={
                  developerMode
                    ? 'text-electric-300'
                    : 'text-slate-300'
                }
                strokeWidth={1.25}
                size="54%"
              />

              {developerMode && (
                <CircuitBoard
                  aria-hidden="true"
                  className="absolute bottom-[13%] right-[13%] rounded-xl border border-electric-400/30 bg-surface-950 p-2 text-electric-300 shadow-electric"
                  size="22%"
                />
              )}
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          className={`absolute inset-x-[15%] bottom-5 h-px bg-linear-to-r from-transparent ${
            developerMode
              ? 'via-electric-400/70'
              : 'via-slate-500/40'
          } to-transparent`}
        />
      </motion.div>
    </div>
  )
}