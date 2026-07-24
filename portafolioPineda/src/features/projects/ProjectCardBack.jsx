import {
  ArrowLeft,
  Code2,
  GitFork,
  Lightbulb,
} from 'lucide-react'

function isValidExternalUrl(url) {
  try {
    const parsedUrl = new URL(url)

    return (
      parsedUrl.protocol === 'https:' ||
      parsedUrl.protocol === 'http:'
    )
  } catch {
    return false
  }
}

export default function ProjectCardBack({
  project,
  active,
  onReturn,
}) {
  const validGithubUrl = isValidExternalUrl(project.githubUrl)

  return (
    <div
      aria-hidden={!active}
      className="absolute inset-0 overflow-y-auto rounded-3xl border border-electric-400/25 bg-surface-900 p-6 shadow-[0_20px_70px_rgba(14,165,233,0.12)]"
      style={{
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-size-[30px_30px]"
      />

      <div className="relative flex min-h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
            project.details
          </p>

          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
          />
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
          {project.title}
        </h3>

        <div className="mt-7">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <Code2
              aria-hidden="true"
              size={16}
              className="text-electric-300"
            />

            Tecnologías
          </h4>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-xl border border-electric-400/20 bg-electric-400/8 px-3 py-2 font-mono text-xs text-electric-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <Lightbulb
              aria-hidden="true"
              size={16}
              className="text-electric-300"
            />

            Aprendizajes
          </h4>

          <ul className="mt-4 space-y-3">
            {project.learnings.map((learning) => (
              <li
                key={learning}
                className="flex items-start gap-3 text-sm leading-6 text-slate-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric-400 shadow-[0_0_9px_rgba(56,189,248,0.7)]"
                />

                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
          {validGithubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={active ? 0 : -1}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-electric-400/30 hover:bg-electric-400/8 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric-400"
            >
              <GitFork aria-hidden="true" size={17} />
              GitHub
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/2 px-4 py-3 text-sm font-bold text-slate-600"
            >
              <GitFork aria-hidden="true" size={17} />
              GitHub
            </span>
          )}

          <button
            type="button"
            tabIndex={active ? 0 : -1}
            onClick={onReturn}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-electric-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-electric transition hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric-400"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}