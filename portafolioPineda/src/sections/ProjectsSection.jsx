import { FolderCode } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import projects from '../content/projects.json'
import ProjectGallery from '../features/projects/ProjectGallery.jsx'
import ProjectImageModal from '../features/projects/ProjectImageModal.jsx'
import TiltProjectCard from '../features/projects/TiltProjectCard.jsx'

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion()
  const [galleryProject, setGalleryProject] = useState(null)
  const [gallerySession, setGallerySession] = useState(0)
  const [modalImage, setModalImage] = useState(null)
  const [imageSession, setImageSession] = useState(0)

  const galleryOpen = Boolean(galleryProject)
  const imageModalOpen = Boolean(modalImage)
  const anyModalOpen = galleryOpen || imageModalOpen

  useEffect(() => {
    if (!anyModalOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.body.classList.add('is-modal-open')

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('is-modal-open')
    }
  }, [anyModalOpen])

  const openGallery = useCallback((project) => {
    setGallerySession((currentSession) => currentSession + 1)
    setGalleryProject(project)
  }, [])

  const closeGallery = useCallback(() => {
    setModalImage(null)
    setGalleryProject(null)
  }, [])

  const openImageModal = useCallback((image) => {
    setImageSession((currentSession) => currentSession + 1)
    setModalImage(image)
  }, [])

  const closeImageModal = useCallback(() => {
    setModalImage(null)
  }, [])

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.09),transparent_35%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.018)_1px,transparent_1px)] bg-size-[54px_54px]"
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
          className="mb-14 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-electric-300">
            <FolderCode aria-hidden="true" size={18} />

            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              {projects.eyebrow}
            </p>
          </div>

          <h2
            id="projects-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {projects.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            {projects.description}
          </p>
        </motion.div>

        <ul className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {projects.items.map((project, index) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenGallery={openGallery}
            />
          ))}
        </ul>
      </div>

      <ProjectGallery
        key={gallerySession}
        project={galleryProject}
        open={galleryOpen}
        suspended={imageModalOpen}
        onClose={closeGallery}
        onOpenImage={openImageModal}
      />

      <ProjectImageModal
        key={imageSession}
        image={modalImage}
        open={imageModalOpen}
        onClose={closeImageModal}
      />
    </section>
  )
}