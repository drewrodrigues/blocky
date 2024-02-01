import { faClose } from '@fortawesome/free-solid-svg-icons/faClose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import clsx from 'clsx'
import React, { useState } from 'react'
import { CONFIG } from '../../utils/config'
import { Block, BlocksByCalendar } from '../../utils/types'
import { SidebarSection } from './sidebarSection'
import { SidebarSectionBlocks } from './SidebarSectionBlocks'
import { SidebarSectionDocumentation } from './SidebarSectionDocumentation'
import { SidebarToggle } from './sidebarToggle'
import '../../assets/style.css' // TODO: do this better my guy
import { useBoolLocalStorage } from '../../utils/hooks'

export class _Sidebar extends React.Component {
  static Section = SidebarSection
  static Toggle = SidebarToggle
}

export interface SidebarProps {
  savedBlocks: BlocksByCalendar
  generatedBlocks: BlocksByCalendar
  selectedBlock?: Block
  onSelectBlock?: (block: Block) => void
  onSaveOrUnsaveBlock?: (block: Block) => void
  onCloseSidebar: () => void
}

type SelectedTab = 'blocks' | 'documentation'

const SIDEBAR_STATE_CACHE = 'Blocky_SidebarState'

export function Sidebar(props: SidebarProps) {
  const [isSidebarToggled, setSidebarToggled] = useBoolLocalStorage(
    SIDEBAR_STATE_CACHE,
    true,
  )
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('blocks')

  function onToggleSidebar() {
    props.onCloseSidebar()
    setSidebarToggled(!isSidebarToggled)
  }

  return (
    <main className="tailwind">
      <aside
        className={clsx(
          'border box-border border-grey-light text-grey-dark h-[100vh] relative flex flex-col font-[Roboto,Helvetica,Arial,sans-serif] sidebar-container',
          isSidebarToggled ? 'w-[300px]' : 'w-0',
        )}
        style={{
          boxShadow:
            '0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%), 0px 2px 4px -1px rgb(0 0 0 / 20%)',
        }}
      >
        <header className="flex bg-grey-lighter px-[20px] pr-0 items-center justify-between select-none">
          <aside className="flex items-center justify-between">
            <button
              className={clsx(
                'text-[11px] py-[3px] px-[5px] rounded-[3px] text-grey-medium mr-[2px] hover:opacity-70 transition-opacity',
                selectedTab === 'blocks' &&
                  'bg-blue text-white font-bold  cursor-default hover:opacity-100',
              )}
              onClick={() => setSelectedTab('blocks')}
            >
              Blocks
            </button>
            <button
              className={clsx(
                'text-[11px] py-[3px] px-[5px] rounded-[3px] text-grey-medium mr-[2px] hover:opacity-70 transition-opacity',
                selectedTab === 'documentation' &&
                  'bg-blue text-white font-bold cursor-default hover:opacity-100',
              )}
              onClick={() => setSelectedTab('documentation')}
            >
              Documentation
            </button>
          </aside>

          <FontAwesomeIcon
            icon={faClose}
            className="text-grey-light cursor-pointer hover:text-grey-medium transition-colors px-[20px] py-[15px]"
            onClick={onToggleSidebar}
          />
        </header>

        <main className="flex flex-col flex-grow overflow-y-scroll">
          {/* ! we can improve threading through composition */}
          {selectedTab === 'blocks' ? (
            // ! ugh, why you just spreading props my guy?
            <SidebarSectionBlocks {...props} />
          ) : (
            <SidebarSectionDocumentation />
          )}
        </main>

        <footer className="text-[12px] text-grey-medium mb-[20px] mx-[20px] flex justify-between">
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

        <button
          className="absolute left-[-37px] bottom-[60px] border border-grey-light p-[5px] flex justify-center items-center rounded-[5px_0_0_5px]"
          onClick={onToggleSidebar}
        >
          <img
            src={CONFIG.logoPath}
            alt="Blocky Logo"
            className="w-[25px] h-[25px]"
          />
        </button>
      </aside>
    </main>
  )
}
