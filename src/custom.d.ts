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

    errorMessage: undefined | string
  }
}
