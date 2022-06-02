import React from 'react'
interface Props {
  children: JSX.Element | JSX.Element[]
}

export function SidebarContainer(props: Props) {
  return (
    <aside
      className="border w-[300px] box-border border-grey-light text-grey-dark h-[100vh] relative flex flex-col font-[Roboto,Helvetica,Arial,sans-serif]"
      style={{
        boxShadow:
          '0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%), 0px 2px 4px -1px rgb(0 0 0 / 20%)',
      }}
    >
      {props.children}
    </aside>
  )
}
