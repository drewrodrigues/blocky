import React from 'react'

interface Props {
  title: string
  subtitle?: string
}

export function SidebarSection(props: Props) {
  return (
    <section>
      <h2 className="">{props.title}</h2>
      <h3 className="">{props.subtitle}</h3>
    </section>
  )
}
