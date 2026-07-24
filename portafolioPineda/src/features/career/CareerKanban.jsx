import KanbanColumn from './KanbanColumn.jsx'

export default function CareerKanban({ columns }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-electric-400/45 via-electric-400/15 to-transparent sm:block lg:left-[calc(16.666%-0.25rem)] lg:right-[calc(16.666%-0.25rem)] lg:top-6 lg:h-px lg:w-auto lg:bg-linear-to-r"
      />

      <ol
        aria-label="Trayectoria académica"
        className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8"
      >
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            index={index}
          />
        ))}
      </ol>
    </div>
  )
}