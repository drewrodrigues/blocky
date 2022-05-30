import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function SidebarContainer(props: Props) {
  return (
    <aside className="border p-[20px] w-[300px] box-border border-grey-light text-grey-dark h-[100vh] relative flex flex-col">
      {props.children}
    </aside>
  )
}
