import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-electric-300">
        Error 404
      </p>

      <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
        Ruta no encontrada
      </h1>

      <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
        La dirección que intentaste abrir no existe dentro del portafolio.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-electric-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-400"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Volver al inicio
      </Link>
    </section>
  )
}