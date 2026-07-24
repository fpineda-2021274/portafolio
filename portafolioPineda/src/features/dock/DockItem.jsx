import { motion, useReducedMotion } from 'motion/react'

function isUsableHref(href) {
  if (
    typeof href !== 'string' ||
    href.trim() === '' ||
    href.startsWith('[')
  ) {
    return false
  }

  if (href.startsWith('mailto:')) {
    return href.length > 'mailto:'.length
  }

  try {
    const parsedUrl = new URL(href)

    return (
      parsedUrl.protocol === 'https:' ||
      parsedUrl.protocol === 'http:'
    )
  } catch {
    return false
  }
}

export default function DockItem({
  item,
  index,
  scale,
  registerItem,
  onPointerDown,
  onPointerEnd,
}) {
  const reduceMotion = useReducedMotion()
  const Icon = item.icon
  const validHref = isUsableHref(item.href)
  const externalLink =
    validHref &&
    (item.href.startsWith('https://') ||
      item.href.startsWith('http://'))

  const sharedClassName = `
    relative grid size-12 shrink-0 place-items-center
    rounded-2xl border border-white/10
    bg-surface-900/95 text-slate-300
    shadow-xl shadow-black/35 backdrop-blur-xl
    transition-colors
    hover:border-electric-400/40
    hover:bg-electric-400/12
    hover:text-electric-300
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-electric-400
    sm:size-14
  `

  const sharedMotionProperties = {
    animate: {
      scale: reduceMotion ? 1 : scale,
      y: reduceMotion ? 0 : -(scale - 1) * 15,
    },
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 24,
      mass: 0.55,
    },
    style: {
      transformOrigin: 'bottom center',
    },
  }

  function handlePointerDown(event) {
    onPointerDown(index, event)
  }

  if (!validHref) {
    return (
      <motion.span
        ref={(element) => registerItem(index, element)}
        role="img"
        aria-label={`${item.label} no configurado`}
        className={`${sharedClassName} cursor-not-allowed opacity-45`}
        onPointerDown={handlePointerDown}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        {...sharedMotionProperties}
      >
        <Icon aria-hidden="true" size={21} />

        <span
          aria-hidden="true"
          className="absolute right-1 top-1 size-1.5 rounded-full bg-amber-400"
        />
      </motion.span>
    )
  }

  return (
    <motion.a
      ref={(element) => registerItem(index, element)}
      href={item.href}
      target={externalLink ? '_blank' : undefined}
      rel={externalLink ? 'noreferrer' : undefined}
      aria-label={item.label}
      className={sharedClassName}
      onPointerDown={handlePointerDown}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      {...sharedMotionProperties}
    >
      <Icon aria-hidden="true" size={21} />

      <span
        aria-hidden="true"
        className="absolute inset-x-2 bottom-1 h-px bg-linear-to-r from-transparent via-electric-300/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.a>
  )
}