import useStorage from './useStorage'

function useSessionStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

export default useSessionStorage
