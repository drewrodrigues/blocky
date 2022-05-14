export interface ParsedCalendarBlock {
  count: number
  calendar: string
  backgroundColor: string
}

export type ParsedCalendarBlocksByTitle = Record<string, ParsedCalendarBlock>

export type ParsedCalendarBlockByOccurrence = ParsedCalendarBlock & {
  title: string
}
