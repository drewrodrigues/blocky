import { CALENDAR_SELECTOR } from './consts'
import { Block, ParsedCalendarBlocksByTitle } from './types'
import { getElementsOrThrow } from './domAccess'

export function listenToViewAndGenerateBlocks({
  isCreatingEvent,
  onUpdate,
}: {
  isCreatingEvent: React.MutableRefObject<boolean>
  onUpdate: (blocks: ParsedCalendarBlocksByTitle) => void
}) {
  return setInterval(() => {
    if (!isCreatingEvent.current) {
      const blocksFoundInView = _getFullDetailsFromAllBlocks()
      onUpdate(blocksFoundInView)
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

    parsedCalendarBlocks[title] = {
      title,
      calendar,
      backgroundColor: styledElement.style.backgroundColor,
    }
  }

  return parsedCalendarBlocks
}

function _blocksSortedByOccurrences(
  blocks: ParsedCalendarBlocksByTitle,
): Block[] {
  const keys = Object.keys(blocks)

  const sortedBlocksTyped: Block[] = []
  keys.forEach((key) => {
    sortedBlocksTyped.push({
      ...blocks[key],
      title: key,
    })
  })

  return sortedBlocksTyped
}
