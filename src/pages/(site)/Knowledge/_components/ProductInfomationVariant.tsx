import { Label } from '@/components/ui/label'
import { useProductItemQuery } from '@/hooks/querys/useProductItemQuery'
import { formatCurrency } from '@/utils/formatCurrency'

const ProductInfomationVariant = ({ productId }: { productId?: string }) => {
  const { data, isLoading, isError } = useProductItemQuery(productId || '', true)

  if (isLoading) {
    return (
      <div className='space-y-4 pb-8'>
        <Label className='font-bold text-2xl '>Biến thể sản phẩm</Label>
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='p-4 border rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
                <div className='flex-1 space-y-4'>
                  <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2'></div>
                  <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3'></div>
                  <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return <div className='text-center text-red-500 dark:text-red-400'>Lỗi khi tải dữ liệu sản phẩm.</div>
  }

  return (
    <div className='space-y-4 pb-8'>
      <Label className='font-bold text-2xl'>Biến thể sản phẩm</Label>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data?.data.data.map((item: any) => (
          <div key={item._id} className='p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800'>
            <div className='flex items-center space-x-4 flex-wrap'>
              <img
                src={item.image ? item.image : 'https://img.icons8.com/parakeet-line/48/image.png'}
                alt=''
                className='rounded-md w-60 h-60'
              />
              <div className='flex-1 space-y-2'>
                {item.variants.map((variant: any) => (
                  <p key={variant.variant}>
                    <span className='font-bold'>{variant.variant}:</span> {variant.value}
                  </p>
                ))}

                <p>
                  <span className='font-bold'>Giá:</span> {formatCurrency(item.price)}
                </p>
                <p>
                  <span className='font-bold'>Số lượng:</span> {item.stock}
                </p>
                <p>
                  <span className='font-bold'>SKU:</span> {item.SKU}
                </p>
                <p>
                  <span className='font-bold'>Trạng thái:</span> {item.status == 'active' ? 'Đang bán' : 'Đã xóa'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductInfomationVariant
