import { CALENDAR_SELECTOR } from './consts'
import { getElementOrThrow, getElementsOrThrow } from './domAccess'
import { log, logError } from './logger'
import { sleep } from './sleep'
import { Block } from './types'

export function listenForModalOpen(
  selectedBlock: Block,
  callback?: (error: Error) => void,
): NodeJS.Timer {
  let _isCreatingEvent = false

  return setInterval(async () => {
    if (_isCreatingEvent || !selectedBlock) return
    const modalFound = document.querySelector(CALENDAR_SELECTOR.MODAL)

    if (modalFound) {
      log('Modal found, creating block...')
      _isCreatingEvent = true
      try {
        await _createEventOnModal({
          title: selectedBlock.title,
          calendar: selectedBlock.calendar,
        })
      } catch (error) {
        callback?.(error as Error)
      } finally {
        _isCreatingEvent = false
      }
    }
  }, 100)
}

async function _createEventOnModal(options: {
  title: string
  calendar: string
}) {
  _insertTitle(options.title)
  await _openCalendarSelectionMenu()
  await _selectCalendarOption(options.calendar)
}

function _insertTitle(title: string) {
  const titleInput = getElementOrThrow<HTMLInputElement>(
    CALENDAR_SELECTOR.MODAL_TITLE_INPUT,
  )
  titleInput.value = title
  titleInput.click()
}

async function _openCalendarSelectionMenu() {
  const calendarSelectionButton = getElementOrThrow<HTMLButtonElement>(
    CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON,
  )
  calendarSelectionButton.click()
  log('Waiting for dropdown to open')
  await sleep(500) // TODO: implement wait on element. This is fucked
}

async function _selectCalendarOption(calendarTitle: string) {
  const calendarOptions = getElementsOrThrow<HTMLButtonElement>(
    CALENDAR_SELECTOR.CALENDAR_OPTION,
  )
  if (!calendarOptions.length) {
    throw new Error('No calendar options found')
  }

  log('Looking for calendar option', { calendarTitle, calendarOptions })
  let foundOption = false
  for (const element of calendarOptions) {
    const dropdownText = element.textContent

    if (dropdownText === calendarTitle) {
      foundOption = true
      log('Found calendar option', {
        dropdownText,
        calendarTitle,
        calendarOptions,
      })

      element.click()
      await sleep(250)
      const saveButton = getElementOrThrow(CALENDAR_SELECTOR.SAVE_BUTTON)
      saveButton.click()
      await sleep(250)
      break
    }
  }

  if (!foundOption) {
    const errorMessage = "Didn't find calendar option"
    logError(errorMessage, { calendarOptions, calendarTitle })
    throw new Error(errorMessage)
  }
}
