import { ProductItemService } from '@/services/productItem'
import { useMutation } from '@tanstack/react-query'

type ProductItemMutation = 'CREATE' | 'UPDATE' | 'DELETE' | 'GET_PRODUCT_BY_ID'

export const useProductItemMutation = (key: ProductItemMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['ProductItem'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ProductItemService.create(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('Cần có ID để cập nhật')
          return await ProductItemService.update(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('Cần phải có ID để xóa')
          return await ProductItemService.delete(params.id)
        case 'GET_PRODUCT_BY_ID':
          if (!params.id) throw new Error('Cần có ID để nhận sản phẩm')
          return await ProductItemService.getByProductId(params.id)
        default:
          throw new Error('Khóa không hợp lệ')
      }
    }
  })
  return { mutate }
}
