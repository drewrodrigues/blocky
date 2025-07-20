import { CALENDAR_SELECTOR } from './consts'
import { getElementsOrThrow } from './domAccess'
import { Block, BlocksByCalendar } from './types'

export function listenToViewAndGenerateBlocks({
  isCreatingEvent,
  onUpdate,
}: {
  isCreatingEvent: boolean
  onUpdate: (
    blocks: BlocksByCalendar,
    durationByTitle: Record<string, number>,
  ) => void
}): NodeJS.Timer {
  return setInterval(() => {
    if (!isCreatingEvent) {
      const [blocksFoundInView, allBlocks] = _getFullDetailsFromAllBlocks()
      // compute durations for all blocks by title
      const durationByTitle: Record<string, number> = {}
      allBlocks.forEach((block) => {
        if (block.duration) {
          durationByTitle[block.title] =
            (durationByTitle[block.title] || 0) + block.duration
        }
      })
      console.log(durationByTitle)
      onUpdate(blocksFoundInView, durationByTitle)
    }
  }, 1000)
}

function _getFullDetailsFromAllBlocks(): [BlocksByCalendar, Block[]] {
  const calendarBlock = getElementsOrThrow(
    CALENDAR_SELECTOR.CALENDAR_BLOCK_TO_PARSE,
  )
  const parsedCalendarBlocks: BlocksByCalendar = {}
  const allBlocks: Block[] = []

  for (const block of calendarBlock) {
    // console.log({ block })
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const sanitizedText = (block.textContent || '').replace('Calendar: ', '')
    // .replace(/.*(am, |pm, )/, '')
    const [, title, calendar] = sanitizedText.split(', ')
    const { startDateTime, endDateTime } = _parseDateTime(sanitizedText)
    const duration = getDurationFromRange(startDateTime, endDateTime)

    if (!title || title === 'No title') {
      // we can have a blank or `No title` when creating a block-- remove it
      continue
    }

    parsedCalendarBlocks[calendar] = parsedCalendarBlocks[calendar] || {}
    parsedCalendarBlocks[calendar][title] = {
      title,
      calendar,
      backgroundColor: block.style.backgroundColor,
      duration,
      startDateTime,
      endDateTime,
    }

    allBlocks.push({
      title,
      calendar,
      backgroundColor: block.style.backgroundColor,
      duration,
      startDateTime,
      endDateTime,
    })
  }

  return [parsedCalendarBlocks, allBlocks]
}

// @ts-ignore
function _parseDateTime(blockString: string): {
  startDateTime: Date
  endDateTime: Date
} {
  if (blockString[0].match(/^[a-zA-Z]/)) {
    // multi-day
    // 'July 6, 2025 at 11:45pm to July 7, 2025 at 5:45am, 🔋 Sleep, Calendar: Rest, No location, '
    const match = blockString.match(
      /([A-Za-z]+)\s(\d{1,2}),\s(\d{4}) at (\d{1,2}(?::\d{2})?[ap]m) to ([A-Za-z]+)\s(\d{1,2}),\s(\d{4}) at (\d{1,2}(?::\d{2})?[ap]m)/,
    )

    if (!match) return { startDate: new Date(), endDate: new Date() }

    const [
      _full,
      startMonth,
      startDay,
      startYear,
      startTime,
      endMonth,
      endDay,
      endYear,
      endTime,
    ] = match

    const startDate = new Date(
      `${startYear} ${startMonth} ${startDay} ${parseTime(startTime)}`,
    )
    const endDate = new Date(
      `${endYear} ${endMonth} ${endDay} ${parseTime(endTime)}`,
    )

    return { startDateTime: startDate, endDateTime: endDate }
  } else {
    // single day
    // '11am to 12pm, 🤯 Mind Training, Calendar: 🧠 Self Care, No location, July 7, 2025'
    // @ts-ignore
    const [, month, day, year] = blockString.match(
      /([A-Za-z]+)\s(\d{1,2}),\s(\d{4})/,
    )
    let [startTime, endTime] = blockString.split(', ')[0].split(' to ')
    startTime = parseTime(startTime)
    endTime = parseTime(endTime)
    const startDate = new Date(`${year} ${month} ${day} ${startTime}`)
    const endDate = new Date(`${year} ${month} ${day} ${endTime}`)

    return { startDateTime: startDate, endDateTime: endDate }
  }
}

function parseTime(timeString: string): string {
  // Normalize and convert time like "11:45pm" or "12pm"
  const [, hourStr, minuteStr] =
    timeString.match(/(\d{1,2})(?::(\d{2}))?/) || []
  const isPm = timeString.toLowerCase().includes('pm')
  let hour = parseInt(hourStr || '0')
  const minute = minuteStr || '00'

  if (isPm && hour !== 12) hour += 12
  if (!isPm && hour === 12) hour = 0

  return `${hour}:${minute}`
}

function getDurationFromRange(startDateTime: Date, endDateTime: Date): number {
  const msDifference = endDateTime.getTime() - startDateTime.getTime()
  const minutes = Math.round(msDifference / (1000 * 60))
  return minutes
}
