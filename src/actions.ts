import { SELECTOR } from './selectors'
import { getElementOrThrow, getElementsOrThrow, sleep } from './utils'

async function createEventOnModal(title: string, calendar: string) {
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

export function createEventOnModalOpen() {
  setInterval(() => {
    const container = document.querySelector(SELECTOR.MODAL)
    const { selectedButton, isCreatingEvent } = window

    if (container && selectedButton && !isCreatingEvent) {
      window.isCreatingEvent = true
      createEventOnModal(selectedButton.title, selectedButton.calendar)
    }
  }, 100)
}
