import './elements'
import './elements'

import {
  blocksSortedByOccurrences,
  getFullDetailsFromAllBlocks,
} from './blockData'
import {
  ParsedCalendarBlockByOccurrence,
  ParsedCalendarBlocksByTitle,
} from './types'
import { getElementOrThrow, sleep } from './utils'
import { createEventOnModal } from './actions'
import { GeneratedBlocks, Sidebar } from './elements'

window.selectedButton = undefined
window.isCreatingEvent = false
const MODAL_SELECTOR = '.K0f0Xc'

function createEventOnModalOpen() {
  setInterval(() => {
    const container = document.querySelector(MODAL_SELECTOR)
    const { selectedButton, isCreatingEvent } = window

    if (container && selectedButton && !isCreatingEvent) {
      window.isCreatingEvent = true
      createEventOnModal(selectedButton.title, selectedButton.calendar)
    }
  }, 100)
}

function renderSidebar(sortedBlocks: ParsedCalendarBlockByOccurrence[]) {
  const sidebar = Sidebar()
  sidebar.append(GeneratedBlocks(sortedBlocks))
  getElementOrThrow('.tEhMVd').append(sidebar)
}

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)

    await sleep(200) // wait for events to be loaded
    const allBlocks = getFullDetailsFromAllBlocks()
    const sortedBlocks = blocksSortedByOccurrences(allBlocks)

    await sleep(2000)
    renderSidebar(sortedBlocks)

    createEventOnModalOpen()
  }
}, 10)
