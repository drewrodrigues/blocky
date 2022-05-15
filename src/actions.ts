import { SELECTOR } from './selectors'
import { getElementOrThrow, getElementsOrThrow, sleep } from './utils'

async function _createEventOnModal(title: string, calendar: string) {
  try {
    const titleInput = getElementOrThrow<HTMLInputElement>(
      SELECTOR.MODAL_TITLE_INPUT,
    )
    titleInput.value = title
    titleInput.click()

    const calendarSelectionButton = getElementOrThrow<HTMLButtonElement>(
      SELECTOR.CALENDAR_OPTION_BUTTON,
    )
    calendarSelectionButton.click()

    await sleep(500) // wait for dropdown to open

    const calendarOptions = getElementsOrThrow<HTMLButtonElement>(
      SELECTOR.CALENDAR_OPTION,
    )
    for (const element of calendarOptions) {
      const dropdownText = element.textContent
      if (dropdownText === calendar) {
        element.click()
        await sleep(250)
        // save
        const saveButton = getElementOrThrow(SELECTOR.SAVE_BUTTON)
        saveButton.click()
        await sleep(250)
        window.isCreatingEvent = false
        return
      }
    }
    window.isCreatingEvent = false
    throw new Error('Failed to create block')
  } catch (e) {
    window.errorMessage = e.message
  }
}

export function listenForModalOpen() {
  setInterval(() => {
    const container = document.querySelector(SELECTOR.MODAL)
    const { selectedButton, isCreatingEvent } = window

    if (container && selectedButton && !isCreatingEvent) {
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
