import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Sidebar, _Sidebar } from './components/sidebar'
import { CALENDAR_SELECTOR } from './utils/consts'
import './assets/style.css'
import { listenToViewAndGenerateBlocks } from './utils/generatedBlocksParser'
import { Block } from './utils/types'

export function Plugin() {
  const [savedBlocks, setSavedBlocks] = useState([])
  const [generatedBlocks, setGeneratedBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block>()

  useEffect(() => {
    listenToViewAndGenerateBlocks((blocks) => {
      setGeneratedBlocks(blocks)
    })
  }, [])

  return (
    <Sidebar
      savedBlocks={savedBlocks}
      generatedBlocks={generatedBlocks}
      selectedBlock={selectedBlock}
      onSelectBlock={(block) => setSelectedBlock(block)}
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
