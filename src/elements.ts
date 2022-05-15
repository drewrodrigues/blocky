import { onSelectBlockClick } from './actions'
import { ParsedCalendarBlockByOccurrence } from './types'

export function Sidebar() {
  const sidebar = document.createElement('aside')
  sidebar.classList.add('sidebar')
  return sidebar
}

function Section(title: string, subtitle: string) {
  const sectionElement = document.createElement('section')
  sectionElement.classList.add('section')

  const titleElement = document.createElement('h2')
  titleElement.textContent = title
  titleElement.classList.add('section-title')
  sectionElement.append(titleElement)

  const subtitleElement = document.createElement('h3')
  subtitleElement.textContent = subtitle
  subtitleElement.classList.add('section-subtitle')
  sectionElement.append(subtitleElement)

  return sectionElement
}

export function GeneratedBlocks(
  sortedBlocks: ParsedCalendarBlockByOccurrence[],
) {
  const sectionElement = Section(
    `Generated Blocks (${sortedBlocks.length})`,
    'Click on a block then your calendar to create a block',
  )
  sectionElement.classList.add('GeneratedBlocks')

  const buttonContainer = document.createElement('header')
  buttonContainer.classList.add('button-container')
  sectionElement.append(buttonContainer)

  for (const block of sortedBlocks) {
    const { title, calendar, backgroundColor } = block

    const button = document.createElement('button')
    button.classList.add('block-button')
    button.onclick = () => onSelectBlockClick(button, title, calendar)
    button.style.backgroundColor = backgroundColor

    const text = document.createElement('span')
    text.textContent = title
    button.append(text)

    buttonContainer.append(button)
  }

  return sectionElement
}
