export function getElementOrThrow<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector)
  if (element) {
    return element as T
  } else {
    throw new Error(`Failed to get element with selector: ${selector}`)
  }
}

export function getElementsOrThrow<T extends HTMLElement>(selector: string) {
  const elements = document.querySelectorAll(selector)
  if (elements.length) {
    return elements as NodeListOf<T>
  } else {
    throw new Error(
      `[Blocky]: Failed to get element with selector: ${selector}`,
    )
  }
}
