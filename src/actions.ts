import { getElementOrThrow, getElementsOrThrow, sleep } from './utils'

export async function createEventOnModal(title: string, calendar: string) {
  try {
    const titleInput = getElementOrThrow<HTMLInputElement>(
      '[aria-label="Add title"]',
    )
    titleInput.value = title
    titleInput.click()

    const calendarSelectionButton = getElementOrThrow<HTMLButtonElement>(
      '[data-key="calendar"]',
    )
    calendarSelectionButton.click()

    await sleep(500) // wait for dropdown to open

    const calendarOptions = getElementsOrThrow<HTMLButtonElement>(
      "div[role='presentation'].OA0qNb.ncFHed .Z7IIl.jT5e9",
    )
    for (const element of calendarOptions) {
      const dropdownText = element.textContent
      if (dropdownText === calendar) {
        element.click()
        await sleep(250)
        // save
        const saveButton = getElementOrThrow(
          "[role='button'].uArJ5e.UQuaGc.Y5sE8d.pEVtpe",
        )
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
