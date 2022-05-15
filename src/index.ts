import { listenForModalOpen as listenForModalThenMaybeCreateBlock } from './actions'
import { listenToViewAndGenerateBlocks } from './blockData'
import './elements'

window.selectedButton = undefined
window.isCreatingEvent = false
window.generatedBlocks = {}

const readyStateCheckInterval = setInterval(async function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)
    listenToViewAndGenerateBlocks()
    listenForModalThenMaybeCreateBlock()
  }
}, 10)
