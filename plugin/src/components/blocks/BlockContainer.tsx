import React from 'react'
import { SharedStyles } from '../../utils/sharedStyles'
import { Block } from '../../utils/types'
import { BlockButton } from './BlockButton'

interface Props {
  blocks: Block[]
  onClick?: (block: Block) => void
  onRightClick?: (block: Block) => void
  selectedBlock?: Block
}

export function BlockContainer(props: Props) {
  return (
    <div
      className="overflow-y-scroll flex-[1_1_0] border border-grey-light p-[10px] rounded-[10px]"
      style={SharedStyles.containerBoxShadow}
    >
      {props.blocks.map((block) => {
        const isSelected = block.title === props.selectedBlock?.title
        return (
          <BlockButton
            {...block}
            key={block.title}
            isHighlighted={isSelected}
            isLoading={isSelected}
            onClick={() => props.onClick?.(block)}
            onRightClick={() => props.onRightClick?.(block)}
          />
        )
      })}
    </div>
  )
}
