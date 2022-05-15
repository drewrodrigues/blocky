import { listenForModalOpen } from './actions'
import {
  blocksSortedByOccurrences,
  getFullDetailsFromAllBlocks,
} from './blockData'
import './elements'
import { GeneratedBlocks, Sidebar } from './elements'
import { SELECTOR } from './selectors'
import { ParsedCalendarBlockByOccurrence } from './types'
import { getElementOrThrow, sleep } from './utils'

window.selectedButton = undefined
window.isCreatingEvent = false

function renderSidebar(sortedBlocks: ParsedCalendarBlockByOccurrence[]) {
  const sidebar = Sidebar()
  sidebar.append(GeneratedBlocks(sortedBlocks))
  getElementOrThrow(SELECTOR.SIDEBAR_CONTAINER).append(sidebar)
}

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)

    await sleep(200) // wait for events to be loaded
    const allBlocks = getFullDetailsFromAllBlocks()
    const sortedBlocks = blocksSortedByOccurrences(allBlocks)

    await sleep(2000)
    renderSidebar(sortedBlocks)

    listenForModalOpen()
  }
}, 10)
