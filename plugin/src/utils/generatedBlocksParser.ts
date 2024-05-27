import { CALENDAR_SELECTOR } from './consts'
import { getElementsOrThrow } from './domAccess'
import { BlocksByCalendar } from './types'

export function listenToViewAndGenerateBlocks({
  isCreatingEvent,
  onUpdate,
}: {
  isCreatingEvent: boolean
  onUpdate: (blocks: BlocksByCalendar) => void
}): NodeJS.Timer {
  return setInterval(() => {
    if (!isCreatingEvent) {
      const blocksFoundInView = _getFullDetailsFromAllBlocks()
      onUpdate(blocksFoundInView)
    }
  }, 1000)
}

function _getFullDetailsFromAllBlocks(): BlocksByCalendar {
  const calendarBlock = getElementsOrThrow(
    CALENDAR_SELECTOR.CALENDAR_BLOCK_TO_PARSE,
  )
  const parsedCalendarBlocks: BlocksByCalendar = {}

  for (const block of calendarBlock) {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const sanitizedText = (block.textContent || '')
      .replace(/.*(am, |pm, )/, '')
      .replace('Calendar: ', '')
    const [title, calendar] = sanitizedText.split(', ')

    if (!title || title === 'No title') {
      // we can have a blank or `No title` when creating a block-- remove it
      continue
    }

    parsedCalendarBlocks[calendar] = parsedCalendarBlocks[calendar] || {}
    parsedCalendarBlocks[calendar][title] = {
      title,
      calendar,
      backgroundColor: block.style.backgroundColor,
    }
  }

  return parsedCalendarBlocks
}
