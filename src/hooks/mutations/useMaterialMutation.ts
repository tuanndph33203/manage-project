import { MaterialService } from '@/services/material'
import { useMutation } from '@tanstack/react-query'

type MaterialMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useMaterialMutation = (key: MaterialMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Material'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await MaterialService.create(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await MaterialService.updateMaterialById(params.id, params.data)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
