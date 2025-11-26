import { ProductService } from '@/services/product' // Import ProductService
import { useMutation } from '@tanstack/react-query'

type ProductMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useProductMutation = (key: ProductMutation, onSuccess?: () => void) => {
  const { mutate } = useMutation({
    mutationKey: ['Product'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ProductService.create(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await ProductService.update(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await ProductService.delete(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    },
    onSuccess: () => {
      if (onSuccess) onSuccess()
    }
  })

  return { mutate }
}
