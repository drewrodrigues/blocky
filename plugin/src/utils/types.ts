export interface Block {
  title: string
  calendar: string
  backgroundColor?: string
  duration?: number
  startDateTime?: Date
  endDateTime?: Date
}

export type SavedCalendarBlock = Omit<Block, 'count'>

type Calendar = string
type BlockTitle = string
export type BlocksByCalendar = Record<Calendar, Record<BlockTitle, Block>>
