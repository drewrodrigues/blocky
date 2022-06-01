import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Sidebar, _Sidebar } from './components/sidebar'
import { CALENDAR_SELECTOR } from './utils/consts'
import './assets/style.css'
import { listenToViewAndGenerateBlocks } from './utils/generatedBlocksParser'
import { Block, ParsedCalendarBlocksByTitle } from './utils/types'
import { listenForModalOpen } from './utils/modalListener'

// TODO: don't allow blocks to show up in both saved & generated

export function Plugin() {
  const [savedBlocks, setSavedBlocks] = useState<ParsedCalendarBlocksByTitle>(
    {},
  )
  const [generatedBlocks, setGeneratedBlocks] =
    useState<ParsedCalendarBlocksByTitle>({})
  const [selectedBlock, setSelectedBlock] = useState<Block>()

  // to temporarily stop listeners while modal is open
  const isCreatingEvent = useRef(false)

  useEffect(() => {
    // ! don't force a re-render unless it's needed -- do a diff here
    const viewListener = listenToViewAndGenerateBlocks({
      isCreatingEvent,
      onUpdate: (blocks) => {
        setGeneratedBlocks((existingBlocks) => ({
          ...existingBlocks,
          ...blocks,
        }))
      },
    })

    return () => {
      clearInterval(viewListener)
    }
  }, [])

  useEffect(() => {
    const modalListener = listenForModalOpen({
      isCreatingEvent: isCreatingEvent,
      selectedBlock,
      onIsCreatingEvent: (_isCreatingEvent) => {
        isCreatingEvent.current = _isCreatingEvent
      },
    })

    return () => {
      clearInterval(modalListener)
    }
  }, [selectedBlock])

  function onSetSelectedBlock(block: Block) {
    // ! improve selection logic (flawed & can allow blocks across panels to be selected)
    const isBlockAlreadySelected = block.title === selectedBlock?.title
    if (isBlockAlreadySelected) {
      setSelectedBlock(undefined)
    } else {
      setSelectedBlock(block)
    }
  }

  function onSaveOrUnsaveBlock(block: Block) {
    const blockAlreadyExists = savedBlocks[block.title]
    const shouldUnsaveBlock = blockAlreadyExists

    if (shouldUnsaveBlock) {
      const newBlocks = { ...savedBlocks }
      delete newBlocks[block.title]
      setSavedBlocks(newBlocks)
    } else {
      setSavedBlocks({ ...savedBlocks, [block.title]: block })
    }
  }

  return (
    <Sidebar
      savedBlocks={Object.values(savedBlocks)}
      generatedBlocks={Object.values(generatedBlocks)}
      selectedBlock={selectedBlock}
      onSelectBlock={onSetSelectedBlock}
      onSaveOrUnsaveBlock={onSaveOrUnsaveBlock}
    />
  )
}

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    const sidebarContainer = document.querySelector(
      CALENDAR_SELECTOR.SIDEBAR_CONTAINER,
    )
    const sidebarRoot = document.createElement('div')
    sidebarContainer?.append(sidebarRoot)

    if (sidebarContainer) {
      const root = createRoot(sidebarRoot)
      root.render(<Plugin />)
    } else {
      console.error('Failed to init Blocky')
    }
    clearInterval(readyStateCheckInterval)
  }
}, 10)
