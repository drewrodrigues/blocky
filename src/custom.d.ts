import { ParsedCalendarBlocksByTitle } from './types'

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

    errorMessage: undefined | string
  }
}
