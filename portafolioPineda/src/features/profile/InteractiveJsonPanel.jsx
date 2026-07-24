import { Braces, Circle, Copy, Check } from 'lucide-react'
import { useState } from 'react'

import JsonGroup from './JsonGroup.jsx'

export default function InteractiveJsonPanel({ data }) {
  const [copied, setCopied] = useState(false)
  const groups = Object.entries(data)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(data, null, 2),
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-electric-400/20 bg-surface-950/90 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Circle
            aria-hidden="true"
            size={10}
            className="fill-red-400 text-red-400"
          />

          <Circle
            aria-hidden="true"
            size={10}
            className="fill-amber-400 text-amber-400"
          />

          <Circle
            aria-hidden="true"
            size={10}
            className="fill-emerald-400 text-emerald-400"
          />

          <span className="ml-2 font-mono text-[0.68rem] text-slate-500 sm:text-xs">
            franklin.profile.json
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar información JSON"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-electric-400/30 hover:bg-electric-400/8 hover:text-electric-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
        >
          {copied ? (
            <Check aria-hidden="true" size={15} />
          ) : (
            <Copy aria-hidden="true" size={15} />
          )}
        </button>
      </div>

      <div className="border-b border-white/8 bg-white/2 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Braces
            aria-hidden="true"
            size={16}
            className="text-electric-300"
          />

          <p className="font-mono text-xs text-slate-400">
            Perfil interactivo
          </p>

          {copied && (
            <span
              role="status"
              className="ml-auto font-mono text-[0.68rem] text-emerald-300"
            >
              JSON copiado
            </span>
          )}
        </div>
      </div>

      <div className="max-h-168 overflow-auto p-4 font-mono text-xs leading-6 sm:p-6 sm:text-sm sm:leading-7">
        <div className="text-slate-500">{'{'}</div>

        <div className="space-y-1 pl-3 sm:pl-5">
          {groups.map(([groupName, groupValue], index) => (
            <JsonGroup
              key={groupName}
              groupName={groupName}
              value={groupValue}
              isLast={index === groups.length - 1}
              defaultOpen={index === 0}
            />
          ))}
        </div>

        <div className="text-slate-500">{'}'}</div>
      </div>
    </div>
  )
}