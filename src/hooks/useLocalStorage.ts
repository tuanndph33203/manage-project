import useStorage from './useStorage'

function useLocalStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage)
}

export default useLocalStorage
