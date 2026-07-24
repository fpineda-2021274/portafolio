import { X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef } from 'react'

import InventoryDetailPanel from './InventoryDetailPanel.jsx'

export default function InventoryMobileSheet({
  skill,
  open,
  onClose,
}) {
  const reduceMotion = useReducedMotion()
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousActiveElement = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Cerrar detalle de habilidad"
            className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
            onClick={onClose}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-skill-title"
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-4xl border border-b-0 border-electric-400/25 bg-surface-950 p-5 pb-8 shadow-[0_-24px_80px_rgba(0,0,0,0.5)] sm:p-7"
            initial={reduceMotion ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: '100%' }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/10" />

            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id="mobile-skill-title"
                className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300"
              >
                Detalle de habilidad
              </h2>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar detalle"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-electric-400/30 hover:bg-electric-400/10 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
              >
                <X aria-hidden="true" size={19} />
              </button>
            </div>

            <InventoryDetailPanel skill={skill} compact />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}