import { faClose } from '@fortawesome/free-solid-svg-icons/faClose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import React, { useState } from 'react'
import { CONFIG } from '../../utils/config'
import { Block } from '../../utils/types'
import { BlockContainer } from '../blocks/BlockContainer'
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
  onSaveOrUnsaveBlock?: (block: Block) => void
}

export function Sidebar(props: Props) {
  const [isSidebarToggled, setIsSidebarToggled] = useState(true)

  const savedBlockCount = props.savedBlocks.length
  const generatedBlockCount = props.generatedBlocks.length

  function onToggleSidebar() {
    setIsSidebarToggled(!isSidebarToggled)
  }

  return (
    <_Sidebar.Container hide={!isSidebarToggled}>
      <>
        <header className="flex bg-grey-lighter px-[20px] pr-0 items-center justify-between select-none">
          <main className="flex">
            <img
              src={CONFIG.logoPath}
              alt="Blocky Logo"
              className="w-[25px] h-[25px] mr-[5px]"
            />
            <h1 className="font-bold text-[14px]">Blocky</h1>
          </main>
          <aside>
            <FontAwesomeIcon
              icon={faClose}
              className="text-grey-light cursor-pointer hover:text-grey-medium transition-colors px-[20px] py-[15px]"
              onClick={onToggleSidebar}
            />
          </aside>
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
      </>
      <_Sidebar.Toggle onClick={onToggleSidebar} />

      <footer className="text-[12px] text-grey-light mb-[20px] mx-[20px] flex justify-between">
        <p>
          Version{' '}
          <a
            className="font-bold underline"
            target="_blank"
            rel="noreferrer"
            href={CONFIG.versionUrl}
          >
            {CONFIG.version}
          </a>
        </p>

        <p>
          Made w/ ❤️ by{' '}
          <a
            href="https://github.com/drewrodrigues"
            className="font-bold underline"
            target="_blank"
            rel="noreferrer"
          >
            Drew
          </a>
        </p>
      </footer>
    </_Sidebar.Container>
  )
}
