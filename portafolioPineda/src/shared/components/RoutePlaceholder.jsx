import { CheckCircle2 } from 'lucide-react'

export default function RoutePlaceholder({
  eyebrow,
  title,
  description,
  highlights,
  nextStep,
}) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-electric-300">
            {eyebrow}
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Estructura disponible
          </p>

          <ul className="mt-6 space-y-4">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm leading-6 text-slate-300"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-electric-400"
                  size={18}
                />

                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-electric-400/20 bg-electric-400/8 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-300">
              Siguiente etapa
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {nextStep}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}