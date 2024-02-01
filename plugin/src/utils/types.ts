export interface Block {
  title: string
  calendar: string
  backgroundColor?: string
}

export type SavedCalendarBlock = Omit<Block, 'count'>

type Calendar = string
type BlockTitle = string
export type BlocksByCalendar = Record<Calendar, Record<BlockTitle, Block>>
