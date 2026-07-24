import {
  AtSign,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  MessageCircle,
  Rocket,
  School,
  Sparkles,
  UserRound,
} from 'lucide-react'

import InteractiveJsonPanel from './InteractiveJsonPanel.jsx'

const iconMap = {
  name: UserRound,
  age: CalendarDays,
  city: MapPin,
  institution: School,
  education: GraduationCap,
  email: AtSign,
  whatsapp: MessageCircle,
  availability: Sparkles,
  focus: BriefcaseBusiness,
  goal: Rocket,
}

function ProfileDetail({ detail }) {
  const Icon = iconMap[detail.key] ?? Sparkles
  const isExternalLink =
    typeof detail.href === 'string' &&
    detail.href.startsWith('http')

  return (
    <li className="flex min-w-0 gap-3 rounded-2xl border border-white/8 bg-white/2.5 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-400/20 bg-electric-400/8 text-electric-300">
        <Icon aria-hidden="true" size={18} />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {detail.label}
        </p>

        {detail.href ? (
          <a
            href={detail.href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noreferrer' : undefined}
            className="mt-1 block wrap-break-word text-sm leading-6 text-slate-200 transition hover:text-electric-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
          >
            {detail.value}
          </a>
        ) : (
          <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-200">
            {detail.value}
          </p>
        )}
      </div>
    </li>
  )
}

export default function ProfileColumns({ profile }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start xl:gap-14">
      <div>
        <p className="max-w-3xl text-base leading-8 text-slate-400">
          {profile.description}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {profile.profileDetails.map((detail) => (
            <ProfileDetail key={detail.key} detail={detail} />
          ))}
        </ul>
      </div>

      <InteractiveJsonPanel data={profile.interactiveProfile} />
    </div>
  )
}