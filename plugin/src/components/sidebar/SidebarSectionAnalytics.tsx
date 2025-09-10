import React from 'react'
import { SidebarSection } from './sidebarSection'

export function SidebarSectionAnalytics({
  durationByTitle,
  durationByCalendar,
}: {
  durationByTitle: Record<string, number>
  durationByCalendar: Record<string, number>
}) {
  // order entries by duration, descending
  const sortedDurationByCalendar = Object.entries(durationByCalendar).sort(
    ([, durationA], [, durationB]) => durationB - durationA,
  )

  const sortedDurationByTitle = Object.entries(durationByTitle).sort(
    ([, durationA], [, durationB]) => durationB - durationA,
  )

  return (
    <div>
      <SidebarSection title="Duration by Calendar">
        <ul>
          {sortedDurationByCalendar.map(([title, duration]) => (
            <li key={title} className="mb-2 block">
              <p className="font-bold">{title}</p>
              <p className="block">{duration / 60} hours</p>
            </li>
          ))}
        </ul>
      </SidebarSection>
      <SidebarSection title="Duration by Event">
        <ul>
          {sortedDurationByTitle.map(([title, duration]) => (
            <li key={title} className="mb-2 block">
              <p className="font-bold">{title}</p>
              <p className="block">{duration / 60} hours</p>
            </li>
          ))}
        </ul>
      </SidebarSection>
    </div>
  )
}
