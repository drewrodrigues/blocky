import {
  ParsedCalendarBlocksByTitle,
  SavedCalendarBlock as SavedBlock,
} from '../../types'

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
    sidebarToggled: boolean
  }
}

export {}
