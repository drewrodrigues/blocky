import React from 'react'

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
  titleCount?: number
  subtitle?: string
}

export function SidebarSection(props: Props) {
  return (
    <section className="mb-[20px] flex flex-col flex-grow last-of-type:mb-0">
      <header className="flex justify-between items-center mb-[10px]">
        <div className="flex flex-col">
          <h2 className="font-bold">{props.title}</h2>
          <h3 className="text-[12px] text-grey-medium">{props.subtitle}</h3>
        </div>
        {props.titleCount !== undefined && (
          <p className="bg-grey-lighter rounded-full text-[10px] p-[5px] text-grey-medium">
            {props.titleCount}
          </p>
        )}
      </header>

      {props.children}
    </section>
  )
}
