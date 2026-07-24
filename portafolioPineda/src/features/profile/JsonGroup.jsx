import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

function JsonPrimitive({ value }) {
  if (typeof value === 'number') {
    return <span className="text-amber-300">{value}</span>
  }

  if (typeof value === 'boolean') {
    return (
      <span className="text-fuchsia-300">
        {value ? 'true' : 'false'}
      </span>
    )
  }

  if (value === null) {
    return <span className="text-slate-500">null</span>
  }

  return (
    <span className="wrap-break-word text-emerald-300">
      &quot;{value}&quot;
    </span>
  )
}

function JsonProperty({ propertyName, value, isLast }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-2 pl-5 sm:pl-7">
      <span className="text-sky-300">
        &quot;{propertyName}&quot;:
      </span>

      <span>
        <JsonPrimitive value={value} />
        {!isLast && <span className="text-slate-500">,</span>}
      </span>
    </div>
  )
}

export default function JsonGroup({
  groupName,
  value,
  isLast = false,
  defaultOpen = false,
}) {
  const reduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const entries = Object.entries(value)

  return (
    <div>
      <div className="flex min-w-0 items-start">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? 'Contraer' : 'Expandir'} grupo ${groupName}`}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          className="group flex min-w-0 items-start gap-1 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
        >
          <ChevronRight
            aria-hidden="true"
            size={16}
            className={`mt-1 shrink-0 text-slate-500 transition-transform group-hover:text-electric-300 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />

          <span className="min-w-0">
            <span className="wrap-break-word text-sky-300">
              &quot;{groupName}&quot;
            </span>

            <span className="text-slate-400">: </span>

            {!isOpen && (
              <>
                <span className="text-slate-500">{'{ … }'}</span>

                {!isLast && <span className="text-slate-500">,</span>}
              </>
            )}

            {isOpen && <span className="text-slate-500">{'{'}</span>}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: 'easeOut',
            }}
            className="overflow-hidden"
          >
            <div className="space-y-1 py-1">
              {entries.map(([propertyName, propertyValue], index) => (
                <JsonProperty
                  key={propertyName}
                  propertyName={propertyName}
                  value={propertyValue}
                  isLast={index === entries.length - 1}
                />
              ))}
            </div>

            <div className="pl-5 text-slate-500 sm:pl-7">
              {'}'}
              {!isLast && ','}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}