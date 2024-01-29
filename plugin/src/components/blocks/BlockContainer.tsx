import React from 'react'
import { SharedStyles } from '../../utils/sharedStyles'
import { Block } from '../../utils/types'
import { BlockButton } from './BlockButton'

interface Props {
  blocks: Record<string, Block[]>
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
      {Object.keys(props.blocks)
        .sort((a, b) =>
          a.match(/[\w\s]+/)![0].localeCompare(b.match(/[\w\s]+/)![0]),
        )
        .map((calendar) => {
          return (
            <div key={calendar}>
              <h5 className="text-[12px] my-[5px]">{calendar}</h5>

              {props.blocks[calendar].map((block) => {
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
        })}
    </div>
  )
}
