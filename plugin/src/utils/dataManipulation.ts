import { BlocksByCalendar } from './types'

export function compareWithoutEmojis(a: string, b: string) {
  return a.match(/[\w\s]+/)![0].localeCompare(b.match(/[\w\s]+/)![0])
}

export function removeBlocksFrom(
  a: BlocksByCalendar,
  b: BlocksByCalendar,
): BlocksByCalendar {
  a = { ...a } // don't mutate input

  for (const bCalendar of Object.keys(b)) {
    if (!a[bCalendar]) continue
    for (const bBlockTitle of Object.keys(b[bCalendar])) {
      delete a[bCalendar][bBlockTitle]
    }
  }

  return a
}
