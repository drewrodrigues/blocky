export function log(...args: any[]) {
  if (process.env.ENV === 'production') {
    return
  }
  console.log('[Blocky]: ', ...args)
}

export function logError(...args: any[]) {
  if (process.env.ENV === 'production') {
    return
  }
  console.error('[Blocky]: ', ...args)
}
