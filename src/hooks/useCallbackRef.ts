import { useEffect, useMemo, useRef } from 'react'

function useCallbackRef(callback: any): any {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  })
  return useMemo(
    () =>
      (...args: any[]) =>
        callbackRef.current?.(...args),
    []
  )
}

export { useCallbackRef }
