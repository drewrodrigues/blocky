import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function SidebarContainer(props: Props) {
  return <aside className="">{props.children}</aside>
}
