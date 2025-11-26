import { useEffect, useState } from 'react'

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Lỗi khi cố gắng bật chế độ toàn màn hình: ${err.message} (${err.name})`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        document.exitFullscreen()
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullScreen])

  return { isFullScreen, toggleFullScreen }
}

export default useFullScreen
