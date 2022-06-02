import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from '../../icons/icon48.png'
import { Block } from '../../utils/types'
import { BlockContainer } from '../blocks/BlockContainer'
import { EmptyPlaceholder } from '../placeholder/EmptyPlaceholder'
import { SidebarContainer } from './sidebarContainer'
import { SidebarSection } from './sidebarSection'
import { SidebarToggle } from './sidebarToggle'

const ActualLogoPath =
  process.env.ENV === 'production'
    ? chrome.runtime.getURL('./icons/icon48.png')
    : Logo

export class _Sidebar extends React.Component {
  static Container = SidebarContainer
  static Section = SidebarSection
  static Toggle = SidebarToggle
}

interface Props {
  savedBlocks: Block[]
  generatedBlocks: Block[]
  selectedBlock?: Block
  onSelectBlock?: (block: Block) => void
  onSaveOrUnsaveBlock?: (block: Block) => void
}

export function Sidebar(props: Props) {
  const savedBlockCount = props.savedBlocks.length
  const generatedBlockCount = props.generatedBlocks.length

  return (
    <_Sidebar.Container>
      <header className="flex bg-grey-lighter px-[20px] py-[10px] items-center justify-center select-none">
        <img
          src={ActualLogoPath}
          alt="Blocky Logo"
          className="w-[25px] h-[25px] mr-[5px]"
        />
        <h1 className="font-bold text-[14px]">Blocky</h1>
      </header>

      <_Sidebar.Section
        title="Saved Blocks"
        subtitle={
          savedBlockCount
            ? 'Right click to un-save blocks. Left click to select a block, then click on your calendar to create a block.'
            : undefined
        }
        titleCount={savedBlockCount}
      >
        {savedBlockCount ? (
          <BlockContainer
            blocks={props.savedBlocks}
            onClick={props.onSelectBlock}
            onRightClick={props.onSaveOrUnsaveBlock}
            selectedBlock={props.selectedBlock}
          />
        ) : (
          <EmptyPlaceholder
            title="No Saved Blocks Yet"
            suggestion="Right click on a generated block to save it."
          />
        )}
      </_Sidebar.Section>
      <_Sidebar.Section
        title="Generated Blocks"
        subtitle={
          generatedBlockCount
            ? 'Right click on block to save it. Navigate through calendar days where you have existing events to generate blocks.'
            : undefined
        }
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
            title="No Generated Blocks Yet"
            suggestion="Navigate through days where you have existing events to generate blocks"
          />
        )}
      </_Sidebar.Section>
      <_Sidebar.Toggle />
    </_Sidebar.Container>
  )
}
