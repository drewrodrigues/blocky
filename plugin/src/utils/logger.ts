/**
 * Log in dev environment, otherwise supress logging
 */
export function log(...args: any[]): void {
  if (process.env.ENV === 'production') {
    return
  }
  console.log('[Blocky]: ', ...args)
}

/**
 * Log in dev environment, otherwise supress logging
 */
export function logError(...args: any[]): void {
  // @ts-ignore
  if (process.env.ENV === 'production') {
    return
  }
  console.error('[Blocky]: ', ...args)
}
