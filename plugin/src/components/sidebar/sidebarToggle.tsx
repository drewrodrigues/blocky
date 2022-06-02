import React from 'react'
import Icon from '../../icons/icon48.png'

interface Props {
  onClick?: () => void
}

export function SidebarToggle(props: Props) {
  return (
    <button
      className="w-[35px] border border-grey-light p-[7px] rounded-tl-[10px] rounded-bl-[10px] absolute bottom-[50px] left-[-35px] select-none"
      onClick={props.onClick}
    >
      <img src={Icon} />
    </button>
  )
}
