import clsx from 'clsx'
import React from 'react'

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
  titleCount?: number
  grow?: boolean
}

export function SidebarSection(props: Props) {
  props = { ...props, grow: props.grow ?? true }

  return (
    <section
      className={clsx(
        props.grow && 'flex-[1_1_0]',
        'flex flex-col mx-[20px] my-[10px] first-of-type:mt-[20px] last-of-type:mb-[20px] text-sm',
      )}
    >
      <header className="flex justify-between items-center mb-[10px] select-none">
        <h2 className="text-[12px]">{props.title}</h2>

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
