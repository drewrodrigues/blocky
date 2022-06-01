import React from 'react'
interface Props {
  children: JSX.Element | JSX.Element[]
}

export function SidebarContainer(props: Props) {
  return (
    <aside className="border w-[300px] box-border border-grey-light text-grey-dark h-[100vh] relative flex flex-col font-[Roboto,Helvetica,Arial,sans-serif]">
      {props.children}
    </aside>
  )
}
