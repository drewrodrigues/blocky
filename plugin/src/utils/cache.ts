import { log, logError } from './logger'
import { BlocksByCalendar } from './types'

type CacheFor = 'SavedBlocks'

export const getCacheKey = (keyEnding: CacheFor) =>
  `BLOCKY_CACHE_BASE-${keyEnding}`

export function cacheBlocks(cacheFor: CacheFor, blocks: BlocksByCalendar) {
  const CACHE_KEY = getCacheKey(cacheFor)

  // async write to not block main thread
  setTimeout(() => {
    chrome.storage.sync.set({ [CACHE_KEY]: blocks })
  }, 0)
}

// TODO: return block by calendar here so we don't have to do any crazy mapping / re-sorting
export async function getCachedBlocks(
  cacheFor: CacheFor,
): Promise<BlocksByCalendar> {
  const CACHE_KEY = getCacheKey(cacheFor)

  try {
    const cachedBlocks = await chrome.storage.sync.get(CACHE_KEY)
    log(`Got cached blocks for ${CACHE_KEY}: ${JSON.stringify(cachedBlocks)}`)
    return cachedBlocks[CACHE_KEY] as BlocksByCalendar
  } catch (e) {
    logError(
      `getCachedBlocks(): Failed to parse blocks for ${CACHE_KEY} - ${e}`,
    )
    return {}
  }
}
