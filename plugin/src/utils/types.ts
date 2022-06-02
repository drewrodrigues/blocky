export interface Block {
  title: string
  calendar: string
  backgroundColor?: string
}

export type SavedCalendarBlock = Omit<Block, 'count'>

type title = string
export type BlockByTitle = Record<title, Block>
