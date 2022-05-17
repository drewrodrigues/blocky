export interface ParsedCalendarBlock {
  count: number
  calendar: string
  backgroundColor: string
  title: string
}

export type SavedCalendarBlock = Omit<ParsedCalendarBlock, 'count'>

type title = string
export type ParsedCalendarBlocksByTitle = Record<title, ParsedCalendarBlock>

export type ParsedCalendarBlockByOccurrence = ParsedCalendarBlock &
  ParsedCalendarBlock
