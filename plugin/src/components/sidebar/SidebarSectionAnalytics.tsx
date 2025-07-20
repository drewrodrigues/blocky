import React from 'react'

export function SidebarSectionAnalytics({
  durationByTitle,
}: {
  durationByTitle: Record<string, number>
}) {
  // order entries by duration, descending
  const sortedEntries = Object.entries(durationByTitle).sort(
    ([, durationA], [, durationB]) => durationB - durationA,
  )

  return (
    <div className="p-4">
      <ul>
        {sortedEntries.map(([title, duration]) => (
          <li key={title} className="mb-2 block">
            <p className="font-bold">{title}</p>
            <p className="block">{duration / 60} hours</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
