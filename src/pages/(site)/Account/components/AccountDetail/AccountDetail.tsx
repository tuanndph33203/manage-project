import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import useAccountQuery from '@/hooks/querys/useAccountQuery'
import { toast } from '@/hooks/use-toast'
import { Unlock } from 'lucide-react'
import { useParams } from 'react-router-dom'
import AccountLockPopup from './components/AccountLockPopup'

const AccountDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { mutate: lockUser } = useAccountMutation({
    action: 'LOCK'
  })
  const { mutate: unLockUser } = useAccountMutation({
    action: 'UNLOCK'
  })
  const { data } = useAccountQuery(id)
  const user = data?.data || {}
  const auth = useAuth()
  const userRole = auth.user?.role

  const onLock = () => {
    if (id) {
      lockUser(id)
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID người dùng.',
        variant: 'destructive'
      })
    }
  }

  const onUnlock = () => {
    if (id) {
      unLockUser({
        id,
        data: undefined
      })
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID người dùng.',
        variant: 'destructive'
      })
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-6'>Tài khoản chi tiết</h2>
        <div className='bg-white shadow-lg rounded-lg p-6 md:p-8'>
          <div className='flex flex-col items-center mb-6'>
            <img
              src='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
              alt='Avatar'
              className='w-24 h-24 rounded-full shadow-md object-cover mb-4'
            />
            <span className='text-lg font-semibold text-gray-700'>{user.data?.name || 'Không có tên'}</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6'>
            <div>
              <span className='font-bold text-gray-600'>Email:</span>
              <span className='ml-2 text-gray-800'>{user.data?.email || 'Không có email'}</span>
            </div>
            <div>
              <span className='font-bold text-gray-600'>Số điện thoại:</span>
              <span className='ml-2 text-gray-800'>{user.data?.phone || 'Không có số diện thoại'}</span>
            </div>
            <div>
              <span className='font-bold text-gray-600'>Trạng thái hoạt động:</span>
              <span className='ml-2 text-gray-800'>{user.data?.active ? 'Đang hoạt động' : 'Đã khóa'}</span>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap gap-4 justify-between'>
            <div className='flex gap-2'>
              {(userRole === 'admin' || userRole === 'support') &&
                (user.data?.active ? (
                  // <Button onClick={onLock} variant='outline' color='yellow' className='mr-2'>
                  //   <Lock size={18} className='mr-2 text-yellow-500' />
                  //   Khóa tài khoản
                  // </Button>
                  <AccountLockPopup user={user?.data} />
                ) : (
                  <Button onClick={onUnlock} variant='outline' color='green' className='mr-2'>
                    <Unlock size={18} className='mr-2 text-green-500' />
                    Mở khóa tài khoản
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetail
