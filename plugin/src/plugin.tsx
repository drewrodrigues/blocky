import React, { useState } from 'react'
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

const root = createRoot(
  document.getElementById(CALENDAR_SELECTOR.SIDEBAR_CONTAINER)!,
)
root.render(<Plugin />)
