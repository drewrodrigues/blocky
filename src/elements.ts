import { addSavedBlock, onSelectBlockClick, removeSavedBlock } from './actions'
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

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('button-container')
  sectionElement.append(buttonContainer)

  for (const block of sortedBlocks) {
    const { title, calendar, backgroundColor } = block

    const button = document.createElement('button')
    button.classList.add('block-button')
    button.oncontextmenu = (e) => {
      e.preventDefault()
      addSavedBlock({ title, calendar, backgroundColor })
    }
    button.onclick = (e) => {
      e.preventDefault()
      onSelectBlockClick(button, title, calendar)
    }
    button.style.backgroundColor = backgroundColor

    const text = document.createElement('span')
    text.textContent = title
    button.append(text)

    buttonContainer.append(button)
  }

  return sectionElement
}

export function SavedBlocks() {
  console.log('Rendering SavedBlocks')
  const sectionElement = Section(
    `Saved Blocks (${window.savedBlocks.length})`,
    'Save & create common blocks here',
  )
  sectionElement.classList.add('SavedBlocks')

  for (const savedBlock of window.savedBlocks) {
    const block = document.createElement('button')
    block.textContent = savedBlock.title
    block.style.backgroundColor = savedBlock.backgroundColor
    block.oncontextmenu = (e) => {
      e.preventDefault()
      removeSavedBlock(savedBlock)
    }

    sectionElement.append(block)
  }

  return sectionElement
}
