import React from 'react'
import { SidebarProps, _Sidebar } from '.'
import { BlockContainer } from '../blocks/BlockContainer'
import { EmptyPlaceholder } from '../placeholder/EmptyPlaceholder'

export function SidebarSectionBlocks(props: SidebarProps) {
  const savedBlockCount = props.savedBlocks.length
  const generatedBlockCount = props.generatedBlocks.length

  return (
    <>
      <_Sidebar.Section title="Saved Blocks" titleCount={savedBlockCount}>
        {savedBlockCount ? (
          <BlockContainer
            blocks={props.savedBlocks}
            onClick={props.onSelectBlock}
            onRightClick={props.onSaveOrUnsaveBlock}
            selectedBlock={props.selectedBlock}
          />
        ) : (
          <EmptyPlaceholder
            title="No Saved Blocks"
            suggestion="Right click on a generated block to save it."
          />
        )}
      </_Sidebar.Section>
      <_Sidebar.Section
        title="Generated Blocks"
        titleCount={generatedBlockCount}
      >
        {generatedBlockCount ? (
          <BlockContainer
            blocks={props.generatedBlocks}
            onClick={props.onSelectBlock}
            onRightClick={props.onSaveOrUnsaveBlock}
            selectedBlock={props.selectedBlock}
          />
        ) : (
          <EmptyPlaceholder
            title="No Generated Blocks"
            suggestion="Navigate through days where you have existing events to generate blocks"
          />
        )}
      </_Sidebar.Section>
    </>
  )
}
