import { useCallback, useEffect, useRef } from 'react'
import { useCallbackRef } from './useCallbackRef'

export function useDebouncedCallback(callback: any, delay?: number) {
  const handleCallback = useCallbackRef(callback)
  const debounceTimerRef = useRef<any>(0)

  useEffect(() => () => window.clearTimeout(debounceTimerRef.current), [])

  const setValue = useCallback(
    (...args: any[]) => {
      window.clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = window.setTimeout(() => handleCallback(...args), delay ?? 500)
    },
    [handleCallback, delay]
  )

  return setValue
}
