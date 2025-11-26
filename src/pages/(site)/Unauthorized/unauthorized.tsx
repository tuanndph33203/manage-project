import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const Unauthorized: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className='flex items-center justify-center bg-white px-6 py-24 sm:rounded-xl sm:px-28'>
      <div className='text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold text-gray-800 opacity-90'>Truy cập không hợp lệ</h1>
        <p className='mt-4 text-lg text-gray-600'>Bạn không có quyền xem trang này.</p>
        {user && user.role ? (
          <Link to='/dashboard' className='flex justify-center mt-8'>
            <Button
              variant={'outline'}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-lg font-semibold'
            >
              Quay về trang quản lý
            </Button>
          </Link>
        ) : (
          <Link to='/' className='flex justify-center mt-8'>
            <Button
              variant={'outline'}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-lg font-semibold'
            >
              Quay về trang đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Unauthorized
