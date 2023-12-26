/**
 * Log in dev environment, otherwise supress logging
 */
export function log(...args: any[]) {
  if (process.env.ENV === 'production') {
    return
  }
  console.log('[Blocky]: ', ...args)
}

/**
 * Log in dev environment, otherwise supress logging
 */
export function logError(...args: any[]) {
  if (process.env.ENV === 'production') {
    return
  }
  console.error('[Blocky]: ', ...args)
}
