import {
  GitFork,
  Mail,
  MessageCircle,
} from 'lucide-react'

import socialLinks from '../../content/socialLinks.json'
import DockItem from './DockItem.jsx'
import useDockMagnification from './useDockMagnification.jsx'

const dockItems = [
  {
    id: 'github',
    label: 'Abrir GitHub',
    href: socialLinks.github,
    icon: GitFork,
  },
  {
    id: 'email',
    label: 'Enviar correo',
    href: socialLinks.email,
    icon: Mail,
  },
  {
    id: 'whatsapp',
    label: 'Abrir WhatsApp',
    href: socialLinks.whatsapp,
    icon: MessageCircle,
  },
]

export default function SocialDock() {
  const {
    registerItem,
    getScale,
    handlePointerMove,
    handlePointerLeave,
    handleItemPointerDown,
    handleItemPointerEnd,
  } = useDockMagnification(dockItems.length)

  return (
    <nav
      aria-label="Enlaces sociales"
      className="social-dock fixed bottom-4 left-1/2 z-60 -translate-x-1/2"
    >
      <div
        className="relative flex items-end gap-2 rounded-[1.35rem] border border-white/10 bg-surface-950/80 px-2.5 py-2 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:gap-3 sm:px-3"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-electric-300/60 to-transparent"
        />

        {dockItems.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            scale={getScale(index)}
            registerItem={registerItem}
            onPointerDown={handleItemPointerDown}
            onPointerEnd={handleItemPointerEnd}
          />
        ))}
      </div>
    </nav>
  )
}