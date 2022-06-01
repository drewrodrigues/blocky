import React from 'react'

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
  titleCount?: number
  subtitle?: string
}

export function SidebarSection(props: Props) {
  return (
    <section className="flex flex-col flex-[1_1_0] mx-[20px] my-[20px] first-of-type:mb-0">
      <header className="flex justify-between items-center mb-[10px] select-none">
        <div className="flex flex-col">
          <h2 className="font-bold">{props.title}</h2>
          <h3 className="text-[12px] text-grey-medium">{props.subtitle}</h3>
        </div>

        {props.titleCount !== undefined && (
          <p className="bg-grey-lighter rounded-[3px] text-[10px] h-[22px] min-w-[22px] text-grey-medium flex items-center justify-center p-[5px] ml-[10px]">
            <span>{props.titleCount}</span>
          </p>
        )}
      </header>

      {props.children}
    </section>
  )
}
