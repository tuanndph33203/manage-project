import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ICategory } from '@/interface/category'
import { CategoryService } from '@/services/category'
import { useQuery } from '@tanstack/react-query'

export const useSingleCategoryQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['CATEGORY', id],
    queryFn: async (): Promise<ICategory> => {
      const response = await CategoryService.getCategoryById(id)
      return response.data
    }
  })

  return { data, ...rest }
}

export const useMultipleCategoryQuery = (pagination?: any, searchTerm: string = '') => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  const { data, ...rest } = useQuery({
    queryKey: ['CATEGORY', pageIndex, searchTerm],
    queryFn: async () => {
      if (pagination) {
        const response = await CategoryService.getLimitedCategories({ pageIndex, pageSize })
        return response.data
      }
      const response = await CategoryService.getAllCategories()
      return response.data
    }
  })

  return { data, ...rest }
}
