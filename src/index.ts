import { listenForModalOpen as listenForModalThenMaybeCreateBlock } from './actions'
import { listenToViewAndGenerateBlocks } from './generatedBlocks'
import './elements'
import { GeneratedBlocks, SavedBlocks, Sidebar } from './elements'
import { CALENDAR_SELECTOR } from './selectors'
import { getElementOrThrow } from './utils'

window.selectedButton = undefined
window.isCreatingEvent = false
window.generatedBlocks = {}
window.savedBlocks = []

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)

    const sidebar = _renderSidebar()
    sidebar.append(SavedBlocks())
    sidebar.append(GeneratedBlocks([]))
    // TODO: analysis
    listenToViewAndGenerateBlocks()
    listenForModalThenMaybeCreateBlock()
  }
}, 10)

function _renderSidebar() {
  const sidebar = Sidebar()

  const sidebarContainer = getElementOrThrow(
    CALENDAR_SELECTOR.SIDEBAR_CONTAINER,
  )
  sidebarContainer.append(sidebar)

  return sidebar
}
