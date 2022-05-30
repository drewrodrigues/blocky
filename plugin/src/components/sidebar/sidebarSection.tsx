import React from 'react'

interface Props {
  title: string
  titleCount?: number
  subtitle?: string
}

export function SidebarSection(props: Props) {
  return (
    <section className="mb-[10px]">
      <header className="flex items-center justify-between">
        <h2 className="font-bold">{props.title}</h2>
        {props.titleCount !== undefined && (
          <p className="bg-grey-light rounded-full text-[10px] p-[5px] text-grey-medium">
            {props.titleCount}
          </p>
        )}
      </header>
      <h3 className="text-[12px] text-grey-medium">{props.subtitle}</h3>
    </section>
  )
}
