import {
  ArrowRight,
  ImageIcon,
  Images,
} from 'lucide-react'
import { useState } from 'react'

export default function ProjectCardFront({
  project,
  projectNumber,
  active,
  onShowDetails,
  onOpenGallery,
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const mainImage = project.images[0]
  const titleId = `project-title-${project.id}`

  return (
    <div
      aria-hidden={!active}
      className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-surface-900 shadow-2xl shadow-black/30"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div className="relative h-56 overflow-hidden border-b border-white/8 bg-surface-950">
        {!imageFailed ? (
          <img
            src={mainImage}
            alt={`Captura principal de ${project.title}`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`Marcador de imagen para ${project.title}`}
            className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_55%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,1))]"
          >
            <div className="text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-electric-400/25 bg-electric-400/10 text-electric-300 shadow-electric">
                <ImageIcon aria-hidden="true" size={28} />
              </span>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Captura pendiente
              </p>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-surface-950 via-transparent to-transparent"
        />

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-surface-950/80 px-3 py-1.5 font-mono text-xs font-bold text-electric-300 backdrop-blur">
          Proyecto {String(projectNumber).padStart(2, '0')}
        </span>

        <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-surface-950/80 px-3 py-1.5 font-mono text-xs text-slate-300 backdrop-blur">
          {project.images.length} capturas
        </span>
      </div>

      <div className="flex h-[calc(100%-14rem)] flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
          project.preview
        </p>

        <h3
          id={titleId}
          className="mt-4 text-2xl font-black tracking-tight text-white"
        >
          {project.title}
        </h3>

        <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-400">
          {project.description}
        </p>

        <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
          <button
            type="button"
            tabIndex={active ? 0 : -1}
            onClick={onShowDetails}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-electric-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-electric transition hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric-400"
          >
            Ver detalles
            <ArrowRight aria-hidden="true" size={17} />
          </button>

          <button
            type="button"
            tabIndex={active ? 0 : -1}
            onClick={onOpenGallery}
            disabled={!onOpenGallery}
            aria-label={`Abrir galería de ${project.title}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-electric-400/30 hover:bg-electric-400/8 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric-400 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Images aria-hidden="true" size={17} />
            Galería
          </button>
        </div>
      </div>
    </div>
  )
}