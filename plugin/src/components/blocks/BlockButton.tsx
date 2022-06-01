import React from 'react'
import { Block } from '../../utils/types'

export function BlockButton(props: Block) {
  return (
    <button
      className="px-[10px] py-[5px] text-[12px] mb-[3px] flex-grow rounded-[5px] w-full text-left"
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.title}
    </button>
  )
}
