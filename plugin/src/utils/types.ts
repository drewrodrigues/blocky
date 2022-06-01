export interface Block {
  title: string
  backgroundColor?: string
  calendar?: string
}

export type SavedCalendarBlock = Omit<Block, 'count'>

type title = string
export type ParsedCalendarBlocksByTitle = Record<title, Block>