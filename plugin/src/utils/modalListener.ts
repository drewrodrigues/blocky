import { CALENDAR_SELECTOR } from './consts'
import { getElementOrThrow, getElementsOrThrow } from './domAccess'
import { sleep } from './sleep'
import { Block } from './types'

export function listenForModalOpen({
  selectedBlock,
  isCreatingEvent,
  onIsCreatingEvent,
}: {
  isCreatingEvent: React.MutableRefObject<boolean>
  onIsCreatingEvent: (isCreatingEvent: boolean) => void
  selectedBlock?: Block
}): NodeJS.Timer {
  return setInterval(() => {
    const modalFound = document.querySelector(CALENDAR_SELECTOR.MODAL)

    const shouldCreateBlock =
      modalFound && selectedBlock && !isCreatingEvent.current
    if (shouldCreateBlock) {
      onIsCreatingEvent(true)
      _createEventOnModal({
        title: selectedBlock.title,
        calendar: selectedBlock.calendar,
        onIsCreatingEvent,
      })
    }
  }, 100)
}

async function _createEventOnModal({
  title,
  calendar,
  onIsCreatingEvent,
}: {
  title: string
  onIsCreatingEvent: (isCreatingEvent: boolean) => void
  calendar?: string
}) {
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
        onIsCreatingEvent(false)
        return
      }
    }
    onIsCreatingEvent(false)
    throw new Error('Failed to create block')
  } catch (e) {
    // TODO: log this somewhere
  }
}
