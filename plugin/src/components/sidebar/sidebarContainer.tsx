import clsx from 'clsx'
import React, { ReactNode } from 'react'
interface Props {
  children: ReactNode
  hide?: boolean
}

export function SidebarContainer(props: Props) {
  return (
    <aside
      className={clsx(
        'border transition-[width,500s] ease-in-out box-border border-grey-light text-grey-dark h-[100vh] relative flex flex-col font-[Roboto,Helvetica,Arial,sans-serif]',
        props.hide ? 'w-0' : 'w-[300px]',
      )}
      style={{
        boxShadow:
          '0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%), 0px 2px 4px -1px rgb(0 0 0 / 20%)',
      }}
    >
      {props.children}
    </aside>
  )
}
