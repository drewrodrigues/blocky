import { useState } from 'react'

export function useLocalStorage(
  storageKey: string,
  defaultValue?: string,
): [string, (nextVal: string) => void] {
  const [value, _setValue] = useState<string>(() => {
    return localStorage.getItem(storageKey) || defaultValue || ''
  })

  function setValue(value: string) {
    _setValue(value)
    localStorage.setItem(storageKey, value)
  }

  return [value, setValue]
}

export function useBoolLocalStorage(
  storageKey: string,
  defaultValue?: boolean,
): [boolean, (nextValue: boolean) => void] {
  const [boolString, _setBoolString] = useLocalStorage(
    storageKey,
    defaultValue ? 'true' : 'false',
  )

  function setBoolString(nextValue: boolean) {
    _setBoolString(nextValue ? 'true' : 'false')
  }

  return [boolString === 'true', setBoolString]
}
