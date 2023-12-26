import { log, logError } from './logger'
import { BlockByTitle } from './types'

type CacheFor = 'SavedBlocks'

export const getCacheKey = (keyEnding: CacheFor) =>
  `BLOCKY_CACHE_BASE-${keyEnding}`

export function cacheBlocks(cacheFor: CacheFor, blocks: BlockByTitle) {
  const CACHE_KEY = getCacheKey(cacheFor)

  // async write to not block main thread
  setTimeout(() => {
    chrome.storage.sync.set({ [CACHE_KEY]: blocks })
  }, 0)
}

export async function getCachedBlocks(cacheFor: CacheFor) {
  const CACHE_KEY = getCacheKey(cacheFor)

  try {
    const cachedBlocks = await chrome.storage.sync.get(CACHE_KEY)
    log(`Got cached blocks for ${CACHE_KEY}: ${JSON.stringify(cachedBlocks)}`)
    return cachedBlocks[CACHE_KEY] as BlockByTitle
  } catch (e) {
    logError(
      `getCachedBlocks(): Failed to parse blocks for ${CACHE_KEY} - ${e}`,
    )
    return {}
  }
}
