import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { IMaterial } from '@/interface/material'
import { MaterialService } from '@/services/material'
import { useQuery } from '@tanstack/react-query'

export const useSingleMaterialQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['MATERIAL', id],
    queryFn: async (): Promise<IMaterial> => {
      const response = await MaterialService.getMaterialById(id)
      return response.data
    }
  })

  return { data, ...rest }
}

export const useMultipleMaterialQuery = (pagination?: any, searchTerm: string = '') => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  const { data, ...rest } = useQuery({
    queryKey: ['MATERIAL', pageIndex, searchTerm],
    queryFn: async () => {
      if (pagination) {
        const response = await MaterialService.getLimitedMaterials({ pageIndex, pageSize })
        return response.data
      }
      const response = await MaterialService.getAllMaterials()
      return response.data
    }
  })

  return { data, ...rest }
}
