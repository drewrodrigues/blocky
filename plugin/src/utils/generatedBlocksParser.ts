import React from 'react'
import { CALENDAR_SELECTOR } from './consts'
import { getElementsOrThrow } from './domAccess'
import { BlockByTitle } from './types'

export function listenToViewAndGenerateBlocks({
  isCreatingEvent,
  onUpdate,
}: {
  isCreatingEvent: React.MutableRefObject<boolean>
  onUpdate: (blocks: BlockByTitle) => void
}) {
  return setInterval(() => {
    if (!isCreatingEvent.current) {
      const blocksFoundInView = _getFullDetailsFromAllBlocks()
      onUpdate(blocksFoundInView)
    }
  }, 1000)
}

function _getFullDetailsFromAllBlocks(): BlockByTitle {
  const calendarBlock = getElementsOrThrow(
    CALENDAR_SELECTOR.CALENDAR_BLOCK_TO_PARSE,
  )
  const parsedCalendarBlocks: BlockByTitle = {}

  for (const block of calendarBlock) {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    //and the calendar section sometimes has 'Calendar: '
    const sanitizedText = (block.textContent || '')
      .replace(/.*(am, |pm, )/, '')
      .replace('Calendar: ', '')
    const [title, calendar] = sanitizedText.split(', ')

    if (!title || title === 'No title') {
      // we can have a blank or `No title` when creating a block-- remove it
      continue
    }

    parsedCalendarBlocks[title] = {
      title,
      calendar,
      backgroundColor: block.parentElement?.style.backgroundColor,
    }
  }

  return parsedCalendarBlocks
}
