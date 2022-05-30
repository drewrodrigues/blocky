import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Sidebar } from './components/sidebar'
import { CALENDAR_SELECTOR } from './utils/selectors'

export function Plugin() {
  const [savedBlocks, setSavedBlocks] = useState([])
  const [generatedBlocks, setGeneratedBlocks] = useState([])

  return (
    <Sidebar.Container>
      <Sidebar.Section title="Saved Blocks"></Sidebar.Section>

      <Sidebar.Section title="Generated Blocks"></Sidebar.Section>

      <Sidebar.Toggle />
    </Sidebar.Container>
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
