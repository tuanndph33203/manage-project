import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { SocketService } from '@/services/socket'

const useListenMessage = (id?: string) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!id) return
    const handleMessageUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ['Conversation', id] })
    }
    SocketService.on(id, handleMessageUpdate)
    return () => {
      SocketService.off(id, () => {})
    }
  }, [queryClient, id])
}

export default useListenMessage
