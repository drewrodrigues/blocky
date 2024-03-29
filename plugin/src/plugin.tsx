import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style.css'
import { Sidebar } from './components/sidebar'
import { cacheBlocks, getCachedBlocks } from './utils/cache'
import { listenToViewAndGenerateBlocks } from './utils/generatedBlocksParser'
import { log, logError } from './utils/logger'
import { listenForModalOpen } from './utils/modalListener'
import { Block, BlocksByCalendar } from './utils/types'
import { CALENDAR_SELECTOR } from './utils/consts'
import { removeBlocksFrom } from './utils/dataManipulation'

// ! fix re-renders on interval
export function Plugin() {
  const [savedBlocks, setSavedBlocks] = useState<BlocksByCalendar>({})
  const [generatedBlocks, setGeneratedBlocks] = useState<BlocksByCalendar>({})
  const [selectedBlock, setSelectedBlock] = useState<Block>()

  // to temporarily stop listeners while modal is open
  const isCreatingEvent = useRef(false)

  // -----------------------------------------------------------------------------
  // Init saved blocks
  // -----------------------------------------------------------------------------
  useEffect(() => {
    getCachedBlocks('SavedBlocks')
      .then((savedBlocks) => {
        setSavedBlocks(savedBlocks || {})
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
    const blockAlreadyExists = savedBlocks[block.calendar]?.[block.title]
    const shouldUnsaveBlock = blockAlreadyExists

    const newBlocks: BlocksByCalendar = { ...savedBlocks }
    if (shouldUnsaveBlock) {
      delete newBlocks[block.calendar][block.title]
    } else {
      newBlocks[block.calendar] = newBlocks[block.calendar] || {} // TODO: pull out
      newBlocks[block.calendar][block.title] = block
    }

    setSavedBlocks(newBlocks)
    cacheBlocks('SavedBlocks', newBlocks)
  }

  const generatedBlocksWithoutSavedBlocks: BlocksByCalendar = removeBlocksFrom(
    generatedBlocks,
    savedBlocks,
  )

  return (
    <Sidebar
      savedBlocks={savedBlocks}
      generatedBlocks={generatedBlocksWithoutSavedBlocks}
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
