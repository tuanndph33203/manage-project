import { useEffect } from 'react'
import { SocketService } from '@/services/socket'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const useListenOrder = () => {
  const { user } = useAuth()
  const naviagte = useNavigate()
  const handleOrderEvent = (data: any) => {
    toast('Order received', {
      icon: '📝',
      description: 'Đặt bới khách hàng : ' + data.orderName,
      action: {
        label: 'Chi tiết',
        onClick: () => {
          naviagte(`/order/edit/${data._id}`)
        }
      }
    })
  }
  useEffect(() => {
    if (user?.role == 'order' || user?.role == 'admin') {
      SocketService.init()
      const socket = SocketService.get()
      if (socket) {
        socket.on('Order', handleOrderEvent)
      }
      return () => {
        if (socket) {
          socket.off('Order', handleOrderEvent)
        }
        SocketService.disconnect()
      }
    }
  }, [user])

  return null
}

export default useListenOrder
