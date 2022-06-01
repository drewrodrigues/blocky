import React from 'react'
import { Block } from './savedBlocks'

export function BlockButton(props: Block) {
  return (
    <button
      className="px-[10px] py-[5px] text-[14px] mb-[3px] flex-grow rounded-[5px] w-full text-left"
      style={{
        border: `1px solid ${props.backgroundColor || 'transparent'}`,
        borderLeft: `5px solid ${props.backgroundColor || 'transparent'}`,
        color: props.backgroundColor,
      }}
    >
      {props.title}
    </button>
  )
}
