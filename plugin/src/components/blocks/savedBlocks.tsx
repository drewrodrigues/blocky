import React from 'react'
import { Block } from '../../utils/types'
import { BlockButton } from './Block'

interface Props {
  blocks: Block[]
}

export function SavedBlocks(props: Props) {
  return (
    <div className="overflow-y-scroll flex-[1_1_0] border border-grey-light p-[10px] rounded-[10px]">
      {props.blocks.map((block) => (
        <BlockButton {...block} />
      ))}
    </div>
  )
}