import React from 'react'
import Icon from '../../icons/icon48.png'

export function SidebarToggle() {
  return (
    <button className="w-[35px] border border-grey-light p-[7px] rounded-tl-[10px] rounded-bl-[10px] absolute bottom-[10px] left-[-35px]">
      <img src={Icon} />
    </button>
  )
}
