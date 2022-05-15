import { GeneratedBlocks, Sidebar } from './elements'
import { CALENDAR_SELECTOR, COMPONENT_SELECTOR } from './selectors'
import {
  ParsedCalendarBlockByOccurrence,
  ParsedCalendarBlocksByTitle,
} from './types'
import { getElementOrThrow, getElementsOrThrow } from './utils'

export function listenToViewAndGenerateBlocks() {
  setInterval(() => {
    const blocksFoundInView = _getFullDetailsFromAllBlocks()

    const mergedOldAndNewBlocks: ParsedCalendarBlocksByTitle = {
      ...blocksFoundInView,
      ...window.generatedBlocks,
    }
    const anyNewBlocksFound =
      Object.keys(window.generatedBlocks).length !==
      Object.keys(mergedOldAndNewBlocks).length

    if (anyNewBlocksFound) {
      console.log('Found new blocks. Re-rendering.')
      window.generatedBlocks = mergedOldAndNewBlocks
      const sortedBlocks = _blocksSortedByOccurrences(mergedOldAndNewBlocks)
      _renderGeneratedBlocks(sortedBlocks)
    }
  }, 1000)
}

function _getFullDetailsFromAllBlocks(): ParsedCalendarBlocksByTitle {
  // '12am to 12:45am, Mary, Calendar: ❤️ Relationships, No location, May 9, 2022'
  const calendarBlock = getElementsOrThrow(
    CALENDAR_SELECTOR.CALENDAR_BLOCK_TO_PARSE,
  )
  const parsedCalendarBlocks: ParsedCalendarBlocksByTitle = {}

  for (const block of calendarBlock) {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const styledElement = block.parentElement!
    const sanitizedText = (block.textContent || '')
      .replace(/.*(am, |pm, )/, '')
      .replace('Calendar: ', '')
    const [title, calendar] = sanitizedText.split(', ')

    if (!title || title === 'No title') {
      // we can have a blank or `No title` when creating a block-- remove it
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

function _blocksSortedByOccurrences(
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

function _renderGeneratedBlocks(
  sortedBlocks: ParsedCalendarBlockByOccurrence[],
) {
  const generatedBlocks = getElementOrThrow(COMPONENT_SELECTOR.GENERATED_BLOCKS)
  const newBlocks = GeneratedBlocks(sortedBlocks)
  generatedBlocks.replaceWith(newBlocks)
}
