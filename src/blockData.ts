import { SELECTOR } from './selectors'
import {
  ParsedCalendarBlockByOccurrence,
  ParsedCalendarBlocksByTitle,
} from './types'
import { getElementsOrThrow } from './utils'

export function getFullDetailsFromAllBlocks(): ParsedCalendarBlocksByTitle {
  // '12am to 12:45am, Dad, Calendar: ❤️ Relationships, No location, May 9, 2022'
  const calendarBlock = getElementsOrThrow(SELECTOR.CALENDAR_BLOCK_TO_PARSE)
  const parsedCalendarBlocks: ParsedCalendarBlocksByTitle = {}

  for (const block of calendarBlock) {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const styledElement = block.parentElement!
    const sanitizedText = (block.textContent || '')
      .replace(/.*(am, |pm, )/, '')
      .replace('Calendar: ', '')
    const [title, calendar] = sanitizedText.split(', ')

    if (!title) {
      // we can have a blank -- remove it
      continue
    }

    if (parsedCalendarBlocks[title]) {
      parsedCalendarBlocks[title].count++
    } else {
      parsedCalendarBlocks[title] = {
        count: 1,
        calendar,
        backgroundColor: styledElement.style.backgroundColor,
      }
    }
  }

  return parsedCalendarBlocks
}

export function blocksSortedByOccurrences(
  blocks: ParsedCalendarBlocksByTitle,
): ParsedCalendarBlockByOccurrence[] {
  const keys = Object.keys(blocks)

  keys.sort((a, b) => blocks[b].count - blocks[a].count)

  const sortedBlocksTyped: ParsedCalendarBlockByOccurrence[] = []
  keys.forEach((key) => {
    sortedBlocksTyped.push({
      ...blocks[key],
      title: key,
    })
  })

  return sortedBlocksTyped
}
