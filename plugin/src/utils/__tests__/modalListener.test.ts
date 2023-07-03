// automock
// mock out getElementOrThrow && getElementsOrThrow

import { CALENDAR_SELECTOR } from '../consts'
import { listenForModalOpen } from '../modalListener'
import { Block } from '../types'

jest.useFakeTimers()
jest.spyOn(global, 'setInterval')

// ! this sucks
// ? can we automock instead

let mockTitleInputClickFn = jest.fn()
const mockTitleInput = {
  value: '',
  click: mockTitleInputClickFn,
} as unknown as HTMLInputElement
const mockCalendarOptionButtonClickFn = jest.fn()
const mockCalendarOptionButton = {
  value: '',
  click: mockCalendarOptionButtonClickFn,
} as unknown as HTMLInputElement
const mockCalendarOptionClickFn = jest.fn()
const mockCalendarOption = {
  click: mockCalendarOptionClickFn,
  textContent: 'Test',
}
const mockSaveButton = {
  click: jest.fn(),
}

// TODO: mock out actual function call instead of the underlying document object
// ! this will be a good opportunity to mock out a esmodule's function

const selectorToElementMap: Record<string, HTMLElement> = {
  [CALENDAR_SELECTOR.MODAL_TITLE_INPUT]: mockTitleInput,
  [CALENDAR_SELECTOR.MODAL]: { click: jest.fn() } as unknown as HTMLDivElement,
  [CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON]:
    mockCalendarOptionButton as unknown as HTMLButtonElement,
  [CALENDAR_SELECTOR.SAVE_BUTTON]:
    mockSaveButton as unknown as HTMLButtonElement,
  [CALENDAR_SELECTOR.SIDEBAR_CONTAINER]: {
    click: jest.fn(),
  } as unknown as HTMLDivElement,
}

const selectorToElementsMap: Record<string, HTMLElement[]> = {
  [CALENDAR_SELECTOR.CALENDAR_OPTION]: [
    mockCalendarOption as unknown as HTMLElement,
  ],
}

jest.spyOn(document, 'querySelector').mockImplementation((argument: string) => {
  return selectorToElementMap[argument] || null
})

jest
  .spyOn(document, 'querySelectorAll')
  .mockImplementation((argument: string) => {
    return selectorToElementsMap[argument] as unknown as NodeListOf<Element>
  })

describe('listenForModalOpen', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('checks for the modal every 100ms', () => {
    expect(setInterval).not.toHaveBeenCalled()

    listenForModalOpen({
      title: 'Test',
      calendar: 'Test',
    } as Block)

    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 100)
  })

  it('returns its interval', () => {
    const interval = listenForModalOpen({
      title: 'Test',
      calendar: 'Test',
    } as Block)

    expect(typeof interval).toEqual('number')
  })

  describe('when modal found', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('inserts and clicks on the title', () => {
      listenForModalOpen({
        title: 'Test',
        calendar: 'Test',
      } as Block)

      jest.advanceTimersByTime(100)
      expect(mockTitleInputClickFn).toHaveBeenCalledTimes(1)
      expect(mockTitleInput.value).toEqual('Test')
    })

    it('clicks calendar option opener button', () => {
      listenForModalOpen({
        title: 'Test',
        calendar: 'Test',
      } as Block)

      jest.advanceTimersByTime(100)
      expect(mockCalendarOptionButtonClickFn).toHaveBeenCalledTimes(1)
    })

    it('clicks calendar option', async () => {
      listenForModalOpen({
        title: 'Test',
        calendar: 'Test',
      } as Block)

      // 100ms for interval on modal + 500ms on sleep for modal
      await jest.advanceTimersByTimeAsync(3_000)

      // ! called multiple times because timeout isn't being cleared. Look into this
      expect(mockCalendarOptionClickFn).toHaveBeenCalled()
    })

    it('clicks save button', async () => {
      listenForModalOpen({
        title: 'Test',
        calendar: 'Test',
      } as Block)

      await jest.advanceTimersByTimeAsync(3_000)

      expect(mockSaveButton.click).toHaveBeenCalled()
    })

    it('calls back with error when unable to insert title', async () => {
      jest
        .spyOn(document, 'querySelector')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementMap }
          delete selectors[CALENDAR_SELECTOR.MODAL_TITLE_INPUT]
          return selectors[selector]
        })

      await new Promise(async (resolve) => {
        listenForModalOpen(
          {
            title: 'Test',
            calendar: 'Test',
          } as Block,
          (error) => {
            if (error) {
              expect(error.message).toMatch(
                `Failed to get element with selector: ${CALENDAR_SELECTOR.MODAL_TITLE_INPUT}`,
              )
              resolve('')
            }
          },
        )

        await jest.advanceTimersByTimeAsync(3_000)
      })
    })

    it('calls back with error when unable to click calendar button', async () => {
      jest
        .spyOn(document, 'querySelector')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementMap }
          delete selectors[CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON]
          return selectors[selector]
        })

      await new Promise(async (resolve) => {
        listenForModalOpen(
          {
            title: 'Test',
            calendar: 'Test',
          } as Block,
          (error) => {
            if (error) {
              expect(error.message).toMatch(
                `Failed to get element with selector: ${CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON}`,
              )
              resolve('')
            }
          },
        )

        await jest.advanceTimersByTimeAsync(3_000)
      })
    })

    it('calls back with error when unable to click calendar option', async () => {
      jest
        .spyOn(document, 'querySelector')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementMap }
          return selectors[selector]
        })
      jest
        .spyOn(document, 'querySelectorAll')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementsMap }
          delete selectors[CALENDAR_SELECTOR.CALENDAR_OPTION]
          return selectors[selector] as unknown as NodeListOf<Element>
        })

      await new Promise(async (resolve) => {
        listenForModalOpen(
          {
            title: 'Test',
            calendar: 'Test',
          } as Block,
          (error) => {
            if (error) {
              expect(error.message).toMatch(
                `Failed to get element with selector: ${CALENDAR_SELECTOR.CALENDAR_OPTION}`,
              )
              resolve('')
            }
          },
        )

        await jest.advanceTimersByTimeAsync(3_000)
      })
    })

    it('calls back with error when unable to click save button', async () => {
      jest
        .spyOn(document, 'querySelectorAll')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementsMap }
          return selectors[selector] as unknown as NodeListOf<Element>
        })
      jest
        .spyOn(document, 'querySelector')
        .mockImplementation((selector: string) => {
          const selectors = { ...selectorToElementMap }
          delete selectors[CALENDAR_SELECTOR.SAVE_BUTTON]
          return selectors[selector]
        })

      await new Promise(async (resolve) => {
        listenForModalOpen(
          {
            title: 'Test',
            calendar: 'Test',
          } as Block,
          (error) => {
            if (error) {
              expect(error.message).toMatch(
                `Failed to get element with selector: ${CALENDAR_SELECTOR.SAVE_BUTTON}`,
              )
              resolve('')
            }
          },
        )

        await jest.advanceTimersByTimeAsync(3_000)
      })
    })
  })
})
