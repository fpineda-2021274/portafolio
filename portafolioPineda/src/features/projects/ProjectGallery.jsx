import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  X,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function ProjectGallery({
  project,
  open,
  suspended = false,
  onClose,
  onOpenImage,
}) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)

  const images = project?.images ?? []
  const activeImage = images[activeIndex]
  const totalImages = images.length
  const activeImageAlt = project
    ? `Captura ${activeIndex + 1} de ${project.title}`
    : 'Captura del proyecto'

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousActiveElement = document.activeElement

    closeButtonRef.current?.focus()

    return () => {
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [open])

  useEffect(() => {
    if (!open || suspended) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll(focusableSelector),
      ).filter(
        (element) =>
          element instanceof HTMLElement &&
          element.offsetParent !== null,
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault()
        lastElement.focus()
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open, suspended])

  function showPreviousImage() {
    if (totalImages === 0) {
      return
    }

    setImageFailed(false)
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? totalImages - 1
        : currentIndex - 1,
    )
  }

  function showNextImage() {
    if (totalImages === 0) {
      return
    }

    setImageFailed(false)
    setActiveIndex((currentIndex) =>
      currentIndex === totalImages - 1
        ? 0
        : currentIndex + 1,
    )
  }

  function handleOpenImage() {
    if (!activeImage || imageFailed) {
      return
    }

    onOpenImage({
      src: activeImage,
      alt: activeImageAlt,
    })
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-70 grid place-items-center p-3 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.2,
          }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-surface-950/90 backdrop-blur-md"
            onMouseDown={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            aria-hidden={suspended}
            inert={suspended ? true : undefined}
            className={`relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-electric-400/25 bg-surface-950 shadow-[0_28px_100px_rgba(0,0,0,0.65)] ${
              suspended ? 'pointer-events-none' : ''
            }`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.97,
                    y: 12,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <header className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-300">
                  project.gallery
                </p>

                <h2
                  id="project-gallery-title"
                  className="mt-1 truncate text-lg font-black text-white sm:text-xl"
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span
                  aria-live="polite"
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-slate-400"
                >
                  {activeIndex + 1} / {totalImages}
                </span>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar galería"
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-electric-400/35 hover:bg-electric-400/10 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
                >
                  <X aria-hidden="true" size={19} />
                </button>
              </div>
            </header>

            <div className="relative flex min-h-0 flex-1 flex-col p-3 sm:p-5">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/8 bg-surface-900">
                {!imageFailed ? (
                  <button
                    type="button"
                    onClick={handleOpenImage}
                    aria-label={`Ampliar ${activeImageAlt}`}
                    className="group grid h-full min-h-88 w-full place-items-center overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-electric-400 sm:min-h-120"
                  >
                    <img
                      key={activeImage}
                      src={activeImage}
                      alt={activeImageAlt}
                      loading="lazy"
                      decoding="async"
                      onError={() => setImageFailed(true)}
                      className="max-h-[68vh] w-full object-contain transition duration-300 group-hover:scale-[1.015]"
                    />

                    <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/10 bg-surface-950/80 px-3 py-1.5 text-xs font-semibold text-slate-300 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      Ampliar imagen
                    </span>
                  </button>
                ) : (
                  <div
                    role="img"
                    aria-label={`Captura pendiente para ${project.title}`}
                    className="grid min-h-88 place-items-center bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_55%)] sm:min-h-120"
                  >
                    <div className="text-center">
                      <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-electric-400/25 bg-electric-400/10 text-electric-300 shadow-electric">
                        <ImageIcon
                          aria-hidden="true"
                          size={28}
                        />
                      </span>

                      <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                        Captura pendiente
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  disabled={totalImages < 2}
                  aria-label="Mostrar captura anterior"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-electric-400/35 hover:bg-electric-400/10 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft aria-hidden="true" size={21} />
                </button>

                <div className="flex justify-center gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => {
                        setImageFailed(false)
                        setActiveIndex(index)
                      }}
                      aria-label={`Mostrar captura ${index + 1}`}
                      aria-current={
                        index === activeIndex ? 'true' : undefined
                      }
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric-400 ${
                        index === activeIndex
                          ? 'w-8 bg-electric-400 shadow-[0_0_12px_rgba(56,189,248,0.65)]'
                          : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showNextImage}
                  disabled={totalImages < 2}
                  aria-label="Mostrar captura siguiente"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-electric-400/35 hover:bg-electric-400/10 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronRight
                    aria-hidden="true"
                    size={21}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}