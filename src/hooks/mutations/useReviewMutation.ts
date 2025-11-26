import { ReviewService } from '@/services/review'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../use-toast'

type ReviewMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useReviewMutation = (key: ReviewMutation) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['Review'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ReviewService.createReview(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await ReviewService.updateReviewById(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await ReviewService.deleteReviewById(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    },
    onSuccess: () => {
      toast({
        title: 'Cập nhật thành công',
        description: `Đánh giá đã được cập nhật trạng thái `,
        variant: 'success',
        duration: 3000
      })
      queryClient.invalidateQueries({
        queryKey: ['Review']
      })
    }
  })

  return { mutate }
}
