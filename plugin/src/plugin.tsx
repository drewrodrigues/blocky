import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style.css'
import { Sidebar } from './components/sidebar'
import { cacheBlocks, getCachedBlocks } from './utils/cache'
import { listenToViewAndGenerateBlocks } from './utils/generatedBlocksParser'
import { log, logError } from './utils/logger'
import { listenForModalOpen } from './utils/modalListener'
import { Block, BlockByTitle } from './utils/types'
import { CALENDAR_SELECTOR } from './utils/consts'

export function Plugin() {
  const [savedBlocks, setSavedBlocks] = useState<BlockByTitle>({})
  const [generatedBlocks, setGeneratedBlocks] = useState<BlockByTitle>({})
  const [selectedBlock, setSelectedBlock] = useState<Block>()

  // to temporarily stop listeners while modal is open
  const isCreatingEvent = useRef(false)

  // -----------------------------------------------------------------------------
  // Init saved blocks
  // -----------------------------------------------------------------------------
  useEffect(() => {
    getCachedBlocks('SavedBlocks')
      .then((savedBlocks) => {
        setSavedBlocks(savedBlocks)
      })
      .catch((e) => {
        logError('Failed to retrieve saved blocks from cache', e)
      })
  }, [])

  // -----------------------------------------------------------------------------
  // Populate generated blocks when not creating an event
  // -----------------------------------------------------------------------------
  useEffect(() => {
    const viewListener = listenToViewAndGenerateBlocks({
      isCreatingEvent: isCreatingEvent.current,
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

  // -----------------------------------------------------------------------------
  // Listen for modal, if found, create event if conditions are right
  // -----------------------------------------------------------------------------
  useEffect(() => {
    const modalListener = listenForModalOpen(
      selectedBlock,
      (error, _isCreatingEvent) => {
        if (error) {
          logError(error)
          return
        }

        if (_isCreatingEvent !== undefined) {
          isCreatingEvent.current = _isCreatingEvent
        }
      },
    )

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

    const newBlocks = { ...savedBlocks }
    if (shouldUnsaveBlock) {
      delete newBlocks[block.title]
    } else {
      newBlocks[block.title] = block
    }

    setSavedBlocks(newBlocks)
    cacheBlocks('SavedBlocks', newBlocks)
  }

  return (
    <Sidebar
      savedBlocks={Object.values(savedBlocks)}
      generatedBlocks={Object.values(generatedBlocks)}
      selectedBlock={selectedBlock}
      onSelectBlock={onSetSelectedBlock}
      onSaveOrUnsaveBlock={onSaveOrUnsaveBlock}
      onCloseSidebar={() => setSelectedBlock(undefined)}
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
      log('Attaching blocky')
      const root = createRoot(sidebarRoot)
      root.render(<Plugin />)
    } else {
      logError('Failed to init Blocky')
    }
    clearInterval(readyStateCheckInterval)
  }
}, 10)
