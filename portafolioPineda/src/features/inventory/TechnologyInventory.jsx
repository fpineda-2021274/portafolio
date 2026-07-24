import {
  Atom,
  Braces,
  Code2,
  Component,
  Database,
  GitBranch,
  GitFork,
  Hexagon,
  Leaf,
  Palette,
} from 'lucide-react'
import { useCallback, useState } from 'react'

import InventoryDetailPanel from './InventoryDetailPanel.jsx'
import InventoryItem from './InventoryItem.jsx'
import InventoryMobileSheet from './InventoryMobileSheet.jsx'

const technologyIconMap = {
  code: Code2,
  palette: Palette,
  braces: Braces,
  atom: Atom,
  hexagon: Hexagon,
  leaf: Leaf,
  database: Database,
  'git-branch': GitBranch,
  github: GitFork,
  figma: Component,
}

export default function TechnologyInventory({
  skills,
  technologies,
}) {
  const [selectedSkill, setSelectedSkill] = useState(skills[0])
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  function handleSkillSelect(skill) {
    setSelectedSkill(skill)

    if (window.matchMedia('(max-width: 1023px)').matches) {
      setMobileSheetOpen(true)
    }
  }

  const closeMobileSheet = useCallback(() => {
    setMobileSheetOpen(false)
  }, [])

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
        <div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => (
              <li key={skill.id}>
                <InventoryItem
                  skill={skill}
                  selected={selectedSkill.id === skill.id}
                  onSelect={handleSkillSelect}
                />
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl border border-white/8 bg-white/2 p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-300">
                  Tecnología secundaria
                </p>

                <h3 className="mt-2 text-xl font-black text-white">
                  Herramientas disponibles
                </h3>
              </div>

              <span className="rounded-full border border-white/10 bg-surface-950/70 px-3 py-1.5 font-mono text-xs text-slate-500">
                {technologies.length} elementos
              </span>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {technologies.map((technology) => {
                const Icon =
                  technologyIconMap[technology.icon] ?? Code2

                return (
                  <li
                    key={technology.name}
                    className="group flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl border border-white/8 bg-surface-950/65 p-3 text-center transition hover:-translate-y-1 hover:border-electric-400/30 hover:bg-electric-400/8"
                  >
                    <span className="grid size-10 place-items-center rounded-xl border border-white/8 bg-white/[0.035] text-slate-400 transition group-hover:border-electric-400/25 group-hover:text-electric-300 group-hover:shadow-electric">
                      <Icon aria-hidden="true" size={19} />
                    </span>

                    <span className="text-xs font-bold text-slate-300">
                      {technology.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <InventoryDetailPanel skill={selectedSkill} />
      </div>

      <InventoryMobileSheet
        skill={selectedSkill}
        open={mobileSheetOpen}
        onClose={closeMobileSheet}
      />
    </>
  )
}