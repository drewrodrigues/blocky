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
    'Generated Blocks',
    'Click on a block then your calendar to create a block',
  )

  const buttonContainer = document.createElement('header')
  buttonContainer.classList.add('button-container')
  sectionElement.append(buttonContainer)

  for (const block of sortedBlocks) {
    const title = Object.keys(block)[0]
    const calendar = Object.values(block)[0].calendar

    const button = document.createElement('button')
    button.classList.add('block-button')
    button.onclick = () => {
      const buttonAlreadyActive = button.classList.contains('active')
      if (buttonAlreadyActive) {
        window.selectedButton = undefined
        button.classList.remove('active')
      } else {
        window.selectedButton = {
          calendar,
          title,
        }
        const alreadyActiveButton = document.querySelector(
          '.block-button.active',
        ) as HTMLElement
        if (alreadyActiveButton) {
          alreadyActiveButton.classList.remove('active')
          alreadyActiveButton.style.boxShadow = ''
        }
        button.classList.add('active')
        button.style.boxShadow = `0 0 20px 5px ${button.style.backgroundColor}`
      }
    }
    button.style.backgroundColor = Object.values(block)[0].style

    const text = document.createElement('span')
    text.textContent = title
    button.append(text)

    buttonContainer.append(button)
  }

  return sectionElement
}
