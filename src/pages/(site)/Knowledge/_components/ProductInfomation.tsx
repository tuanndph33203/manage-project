import { useParams } from 'react-router-dom'
import { useSingleProductQuery } from '@/hooks/querys/useProductQuery'
import { Skeleton } from '@/components/ui/skeleton'
import ProductInfomationVariant from './ProductInfomationVariant'
import ProductInfomationReview from './ProductInfomationReview/ProductInfomationReview'

const ProductInfo = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useSingleProductQuery(id || '')

  if (isLoading) {
    return (
      <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen p-6'>
        <div className='font-bold text-2xl dark:text-gray-100 mb-6'>Thông tin sản phẩm</div>
        <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6'>
          <Skeleton className='h-6 w-1/3 bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-4 w-1/2 bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-6 w-1/3 bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-4 w-1/2 bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-6 w-1/3 bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-4 w-1/2 bg-gray-200 dark:bg-gray-700' />
          <div className='flex flex-wrap gap-6'>
            <Skeleton className='w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg' />
            <Skeleton className='w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg' />
            <Skeleton className='w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg' />
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return <div className='text-center text-red-500 dark:text-red-400'>Lỗi khi tải dữ liệu sản phẩm.</div>
  }

  return (
    <div className='bg-[#F5F6FA] dark:bg-gray-900 h-screen p-6'>
      <div className='font-bold text-2xl dark:text-gray-100 mb-6'>Thông tin sản phẩm</div>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6'>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Tên sản phẩm:</h3>
          <p className='text-gray-700 dark:text-gray-300'>{data?.data.data.name}</p>
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Danh mục:</h3>
          <p className='text-gray-700 dark:text-gray-300'>
            {data?.data.data.category?.categoryName || 'Chưa có danh mục'}
          </p>
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Chất liệu:</h3>
          <p className='text-gray-700 dark:text-gray-300'>
            {data?.data.data.material?.materialName || 'Chưa có thông tin'}
          </p>
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Chi tiết chất liệu:</h3>
          <p className='text-gray-700 dark:text-gray-300'>
            {data?.data.data.materialDetail || 'Không có thông tin chi tiết'}
          </p>
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Trạng thái:</h3>
          <p className='text-gray-700 dark:text-gray-300'>
            {data?.data.data.status === 'creating' && 'Sắp bán'}
            {data?.data.data.status === 'available' && 'Đang bán'}
            {data?.data.data.status === 'disable' && 'Ngừng bán'}
          </p>
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Mô tả:</h3>
          <p className='text-gray-700 dark:text-gray-300'>{data?.data.data.description || 'Không có mô tả'}</p>
        </div>
        <div className='mb-4'>
          <div className='flex flex-wrap gap-6'>
            {data?.data.data.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hình ảnh sản phẩm ${index + 1}`}
                className='w-96 h-96 object-cover rounded-lg border shadow-md'
              />
            ))}
          </div>
        </div>
        <ProductInfomationVariant productId={data?.data.data._id} />
        <ProductInfomationReview id={data?.data.data._id}/>
      </div>
    </div>
  )
}

export default ProductInfo
