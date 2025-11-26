import { ProductItemService } from '@/services/productItem'
import { useQuery } from '@tanstack/react-query'

export const useProductItemQuery = (id?: string, isProduct?: boolean) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['ProductItem', id] : ['ProductItem'],
    queryFn: async () => {
      if (id && isProduct) {
        return await ProductItemService.getByProductId(id)
      } else if (id) {
        return await ProductItemService.getById(id)
      } else {
        return await ProductItemService.getAll()
      }
    }
  })
  return {
    data,
    isLoading,
    isError,
    ...rest
  }
}
