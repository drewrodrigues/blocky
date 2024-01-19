import { useState } from 'react'

export function useLocalStorage(
  storageKey: string,
): [string, (nextVal: string) => void] {
  const [value, _setValue] = useState<string>(() => {
    return localStorage.getItem(storageKey) || ''
  })

  function setValue(value: string) {
    _setValue(value)
    localStorage.setItem(storageKey, value)
  }

  return [value, setValue]
}

export function useBoolLocalStorage(
  storageKey: string,
): [boolean, (nextValue: boolean) => void] {
  const [boolString, _setBoolString] = useLocalStorage(storageKey)

  function setBoolString(nextValue: boolean) {
    _setBoolString(nextValue ? 'true' : 'false')
  }

  return [boolString === 'true', setBoolString]
}
