import {
  ParsedCalendarBlocksByTitle,
  SavedCalendarBlock as SavedBlock,
} from './types'

export {}

declare global {
  interface Window {
    selectedButton:
      | {
          calendar: string
          title: string
        }
      | undefined
    isCreatingEvent: boolean
    generatedBlocks: ParsedCalendarBlocksByTitle
    savedBlocks: SavedBlock[]
  }
}
