import { GeneratedBlocks, Sidebar } from './elements'
import { CALENDAR_SELECTOR, COMPONENT_SELECTOR } from './selectors'
import {
  ParsedCalendarBlockByOccurrence,
  ParsedCalendarBlocksByTitle,
} from './types'
import { getElementOrThrow, getElementsOrThrow, sleep } from './utils'

export function listenToViewAndGenerateBlocks() {
  setInterval(() => {
    const allBlocks = _getFullDetailsFromAllBlocks()
    const sortedBlocks = _blocksSortedByOccurrences(allBlocks) // ! only sort blocks if there's been a change/addition to set
    _renderSidebar(sortedBlocks)
  }, 1000)
}

function _getFullDetailsFromAllBlocks(): ParsedCalendarBlocksByTitle {
  // '12am to 12:45am, Dad, Calendar: ❤️ Relationships, No location, May 9, 2022'
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

// ! we can be more selective with which elements to re-render (like only the generated blocks)
function _renderSidebar(sortedBlocks: ParsedCalendarBlockByOccurrence[]) {
  const existingSidebar = document.querySelector(COMPONENT_SELECTOR.SIDEBAR)

  const sidebar = Sidebar()
  sidebar.append(GeneratedBlocks(sortedBlocks))

  const sidebarContainer = getElementOrThrow(
    CALENDAR_SELECTOR.SIDEBAR_CONTAINER,
  )
  if (existingSidebar) {
    existingSidebar.replaceWith(sidebar)
  } else {
    sidebarContainer.append(sidebar)
  }
}
