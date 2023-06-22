import { logError } from './logger'
import { BlockByTitle } from './types'

type CacheFor = 'SavedBlocks'

export const getCacheKey = (keyEnding: CacheFor) =>
  `BLOCKY_CACHE_BASE-${keyEnding}`

export function cacheBlocks(cacheFor: CacheFor, blocks: BlockByTitle) {
  const CACHE_KEY = getCacheKey(cacheFor)

  // async write to not block main thread
  setTimeout(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(blocks))
  }, 0)
}

export function getCachedBlocks(cacheFor: CacheFor) {
  const CACHE_KEY = getCacheKey(cacheFor)

  const unparsedJson = localStorage.getItem(CACHE_KEY)
  try {
    const parsedBlocks = JSON.parse(unparsedJson || '{}')
    return parsedBlocks as BlockByTitle
  } catch {
    logError(`getCachedBlocks(): Failed to parse blocks for ${cacheFor}`)
    return {}
  }
}
