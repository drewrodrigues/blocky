import React, { useState } from 'react'
import Logo from '../../icons/icon48.png'
import { GeneratedBlocks } from '../blocks/generatedBlocks'
import { Block, SavedBlocks } from '../blocks/savedBlocks'
import { EmptyPlaceholder } from '../placeholder/EmptyPlaceholder'
import { SidebarContainer } from './sidebarContainer'
import { SidebarSection } from './sidebarSection'
import { SidebarToggle } from './sidebarToggle'

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
}

export function Sidebar(props: Props) {
  return (
    <_Sidebar.Container>
      <header className="flex bg-grey-lighter px-[20px] py-[10px] items-center justify-center select-none">
        <img
          src={Logo}
          alt="Blocky Logo"
          className="w-[25px] h-[25px] mr-[5px]"
        />
        <h1 className="font-bold text-[14px]">Blocky</h1>
      </header>

      <_Sidebar.Section
        title="Saved Blocks"
        subtitle="Some Subtitle Goes Here"
        titleCount={props.savedBlocks.length}
      >
        {props.savedBlocks.length ? (
          <SavedBlocks blocks={props.savedBlocks} />
        ) : (
          <EmptyPlaceholder
            title="No Saved Blocks Yet"
            suggestion="Right click on a generated block to save it."
          />
        )}
      </_Sidebar.Section>
      <_Sidebar.Section
        title="Generated Blocks"
        subtitle="Some Subtitle Goes Here"
        titleCount={props.generatedBlocks.length}
      >
        {props.generatedBlocks.length ? (
          <GeneratedBlocks />
        ) : (
          <EmptyPlaceholder
            title="No Generated Blocks Yet"
            suggestion="Navigate through days where you have existing events to generate blocks."
          />
        )}
      </_Sidebar.Section>
      <_Sidebar.Toggle />
    </_Sidebar.Container>
  )
}
