import { Block } from './types'

export function groupByCalendar(blocks: Block[]): Record<string, Block[]> {
  const groups: Record<string, Block[]> = {}
  for (const block of blocks) {
    groups[block.calendar] = groups[block.calendar] || []
    groups[block.calendar].push(block)
  }
  return groups
}
