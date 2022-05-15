import { listenForModalOpen as listenForModalThenMaybeCreateBlock } from './actions'
import { listenToViewAndGenerateBlocks } from './blockData'
import './elements'
import { GeneratedBlocks, Sidebar } from './elements'
import { CALENDAR_SELECTOR } from './selectors'
import { ParsedCalendarBlockByOccurrence } from './types'
import { getElementOrThrow, sleep } from './utils'

window.selectedButton = undefined
window.isCreatingEvent = false

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)
    listenToViewAndGenerateBlocks()
    listenForModalThenMaybeCreateBlock()
  }
}, 10)
