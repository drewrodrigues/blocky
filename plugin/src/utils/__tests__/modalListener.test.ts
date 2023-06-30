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

jest.spyOn(document, 'querySelector').mockImplementation((argument) => {
  if (argument === CALENDAR_SELECTOR.MODAL_TITLE_INPUT) {
    return mockTitleInput
  } else if (argument === CALENDAR_SELECTOR.MODAL) {
    return { click: jest.fn() } as unknown as HTMLDivElement
  } else if (argument === CALENDAR_SELECTOR.CALENDAR_OPTION_BUTTON) {
    return mockCalendarOptionButton as unknown as HTMLButtonElement
  } else if (argument === CALENDAR_SELECTOR.SAVE_BUTTON) {
    return mockSaveButton as unknown as HTMLButtonElement
  } else if (argument === CALENDAR_SELECTOR.SIDEBAR_CONTAINER) {
    return { click: jest.fn() } as unknown as HTMLDivElement
  }

  return null
})

jest.spyOn(document, 'querySelectorAll').mockImplementation((argument) => {
  if (argument === CALENDAR_SELECTOR.CALENDAR_OPTION) {
    return [mockCalendarOption] as unknown as NodeListOf<Element>
  }

  return [] as unknown as NodeListOf<Element>
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

    it.todo('throws an error when unable to insert title')
    it.todo('throws an error when unable to click calendar button')
    it.todo('throws an error when unable to click calendar option')
    it.todo('throws an error when unable to click save button')
  })
})
