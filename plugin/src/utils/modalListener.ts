import React from 'react'
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
      Helpers.createEventOnModal({
        title: selectedBlock.title,
        calendarTitle: selectedBlock.calendar,
        onIsCreatingEvent,
      })
    }
  }, 100)
}

namespace Helpers {
  export async function createEventOnModal(options: {
    title: string
    onIsCreatingEvent: (isCreatingEvent: boolean) => void
    calendarTitle: string
  }) {
    _insertTitle(options.title)
    await _clickSelectedCalendarOption(options.calendarTitle)
    options.onIsCreatingEvent(false)
  }

  function _insertTitle(title: string) {
    const titleInput = getElementOrThrow<HTMLInputElement>(
      CALENDAR_SELECTOR.MODAL_TITLE_INPUT,
    )
    titleInput.value = title
    titleInput.click()
  }

  async function _clickSelectedCalendarOption(calendarTitle: string) {
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
      if (dropdownText === calendarTitle) {
        element.click()
        await sleep(250)
        const saveButton = getElementOrThrow(CALENDAR_SELECTOR.SAVE_BUTTON)
        saveButton.click()
        await sleep(250)
        return
      }
    }
  }
}
