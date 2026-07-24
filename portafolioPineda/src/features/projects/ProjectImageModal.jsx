import { ImageIcon, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

export default function ProjectImageModal({
  image,
  open,
  onClose,
}) {
  const reduceMotion = useReducedMotion()
  const closeButtonRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousActiveElement = document.activeElement

    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [onClose, open])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-80 grid place-items-center bg-black/95 p-3 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.2,
          }}
          onMouseDown={onClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada del proyecto"
            className="relative flex h-full w-full items-center justify-center"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {!imageFailed ? (
              <motion.img
                src={image.src}
                alt={image.alt}
                decoding="async"
                onError={() => setImageFailed(true)}
                className="max-h-[94vh] max-w-full object-contain"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.96,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : (
              <div
                role="img"
                aria-label="Imagen no disponible"
                className="grid size-28 place-items-center rounded-3xl border border-white/10 bg-white/4 text-slate-500"
              >
                <ImageIcon aria-hidden="true" size={42} />
              </div>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar imagen ampliada"
              className="absolute right-2 top-2 grid size-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur transition hover:border-electric-400/50 hover:bg-electric-400/15 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 sm:right-4 sm:top-4"
            >
              <X aria-hidden="true" size={21} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}