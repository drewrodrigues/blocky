import { listenForModalOpen as listenForModalThenMaybeCreateBlock } from './actions'
import { listenToViewAndGenerateBlocks } from './blockData'
import './elements'
import { GeneratedBlocks, Sidebar } from './elements'
import { CALENDAR_SELECTOR } from './selectors'
import { getElementOrThrow } from './utils'

window.selectedButton = undefined
window.isCreatingEvent = false
window.generatedBlocks = {}

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)

    _renderSidebar()
    listenToViewAndGenerateBlocks()
    listenForModalThenMaybeCreateBlock()
  }
}, 10)

function _renderSidebar() {
  const sidebar = Sidebar()
  sidebar.append(GeneratedBlocks([]))

  const sidebarContainer = getElementOrThrow(
    CALENDAR_SELECTOR.SIDEBAR_CONTAINER,
  )
  sidebarContainer.append(sidebar)
}
