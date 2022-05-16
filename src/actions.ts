import { LOCAL_STORAGE_SAVED_BLOCKS } from './consts'
import { SavedBlocks } from './elements'
import { CALENDAR_SELECTOR, COMPONENT_SELECTOR } from './selectors'
import { SavedCalendarBlock } from './types'
import { getElementOrThrow, getElementsOrThrow, sleep } from './utils'

async function _createEventOnModal(title: string, calendar: string) {
  try {
    const titleInput = getElementOrThrow<HTMLInputElement>(
      CALENDAR_SELECTOR.MODAL_TITLE_INPUT,
    )
    titleInput.value = title
    titleInput.click()

    const calendarSelectionButton = getElementOrThrow<HTMLButtonElement>(
      CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON,
    )
    calendarSelectionButton.click()

    await sleep(500) // wait for dropdown to open

    const calendarOptions = getElementsOrThrow<HTMLButtonElement>(
      CALENDAR_SELECTOR.CALENDAR_OPTION,
    )
    for (const element of calendarOptions) {
      const dropdownText = element.textContent
      if (dropdownText === calendar) {
        element.click()
        await sleep(250)
        // save
        const saveButton = getElementOrThrow(CALENDAR_SELECTOR.SAVE_BUTTON)
        saveButton.click()
        await sleep(250)
        window.isCreatingEvent = false
        return
      }
    }
    window.isCreatingEvent = false
    throw new Error('Failed to create block')
  } catch (e) {
    // TODO: log this somewhere
  }
}

export function listenForModalOpen() {
  setInterval(() => {
    const modalFound = document.querySelector(CALENDAR_SELECTOR.MODAL)
    const { selectedButton, isCreatingEvent } = window

    const shouldCreateBlock = modalFound && selectedButton && !isCreatingEvent
    if (shouldCreateBlock) {
      window.isCreatingEvent = true
      _createEventOnModal(selectedButton.title, selectedButton.calendar)
    }
  }, 100)
}

export function onSelectBlockClick(
  button: HTMLButtonElement,
  title: string,
  calendar: string,
) {
  const buttonAlreadyActive = button.classList.contains('active')
  if (buttonAlreadyActive) {
    window.selectedButton = undefined
    button.classList.remove('active')
    button.style.boxShadow = ''
  } else {
    window.selectedButton = {
      title,
      calendar,
    }
    const otherActiveButton = document.querySelector(
      '.block-button.active',
    ) as HTMLElement
    if (otherActiveButton) {
      otherActiveButton.classList.remove('active')
      otherActiveButton.style.boxShadow = ''
    }
    button.classList.add('active')
    button.style.boxShadow = `0 0 20px 5px ${button.style.backgroundColor}`
  }
}

export function addSavedBlock(newBlock: SavedCalendarBlock) {
  window.savedBlocks.push(newBlock)
  const savedBlocksElement = getElementOrThrow(COMPONENT_SELECTOR.SAVED_BLOCKS)
  savedBlocksElement.replaceWith(SavedBlocks()) // re-render
  window.localStorage.setItem(
    LOCAL_STORAGE_SAVED_BLOCKS,
    JSON.stringify(window.savedBlocks),
  )
}

export function removeSavedBlock(removedBlock: SavedCalendarBlock) {
  window.savedBlocks = window.savedBlocks.filter(
    (block) => block !== removedBlock,
  )
  window.localStorage.setItem(
    LOCAL_STORAGE_SAVED_BLOCKS,
    JSON.stringify(window.savedBlocks),
  )
  const savedBlocksElement = getElementOrThrow(COMPONENT_SELECTOR.SAVED_BLOCKS)
  savedBlocksElement.replaceWith(SavedBlocks())
}

export function onToggleSidebar(button: HTMLButtonElement) {
  const newToggledState = !window.sidebarToggled
  window.sidebarToggled = newToggledState

  if (newToggledState) {
    getElementOrThrow(COMPONENT_SELECTOR.SIDEBAR).style.display = 'flex'
    button.classList.remove('toggle-button--closed')
  } else {
    getElementOrThrow(COMPONENT_SELECTOR.SIDEBAR).style.display = 'none'
    button.classList.add('toggle-button--closed')
  }
}
