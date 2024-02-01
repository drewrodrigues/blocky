export interface Block {
  title: string
  calendar: string
  backgroundColor?: string
}

export type SavedCalendarBlock = Omit<Block, 'count'>

type Title = string
type Calendar = string
export type BlocksByCalendar = Record<Calendar, Block>
