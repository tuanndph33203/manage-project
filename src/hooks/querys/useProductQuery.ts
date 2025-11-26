import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'

export const useSingleProductQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT', id],
    queryFn: async () => {
      return await ProductService.getById(id)
    }
  })

  return { data, ...rest }
}

export const useMultipleProductQuery = (
  pagination?: any,
  status: string = 'all',
  categoryId: string = '',
  searchTerm: string = '',
  categorySearchTerm: string = ''
) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT', pageIndex, searchTerm, categorySearchTerm],
    queryFn: async () => {
      if (pagination) {
        const response = await ProductService.getLimited({ pageIndex, pageSize }, status, categoryId)
        return response.data
      }
      const response = await ProductService.getAll()
      return response.data
    }
  })

  return { data, ...rest }
}
export const useProuductCount = (period: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT'],
    queryFn: async () => {
      const res = await ProductService.count(period)
      return res.data
    }
  })
  return { data, ...rest }
}
