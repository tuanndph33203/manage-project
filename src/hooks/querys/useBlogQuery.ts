import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { BlogService } from '@/services/blog'
import { useQuery } from '@tanstack/react-query'

export const useSingleBlogQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['BLOG', id],
    queryFn: async () => {
      return await BlogService.getById(id)
    }
  })

  return { data, ...rest }
}

export const useMultipleBlogQuery = (
  pagination?: { pageIndex?: number; pageSize?: number },
  searchTerm: string = ''
) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  const { data, ...rest } = useQuery({
    queryKey: ['BLOG', pageIndex, searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        const response = await BlogService.getBlogsByEmployeeId(searchTerm)
        return response.data
      } else if (pagination) {
        const response = await BlogService.getLimited({ pageIndex, pageSize })
        return response.data
      } else {
        const response = await BlogService.getAll()
        return response.data
      }
    }
  })

  return { data, ...rest }
}
