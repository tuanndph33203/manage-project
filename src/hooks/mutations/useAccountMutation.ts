/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountService } from '@/services/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

type MutationQueryProps = {
  action: 'LOCK' | 'UNLOCK' | 'DELETE'
}

const useAccountMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['ACCOUNT']
    })
    switch (action) {
      case 'LOCK':
        toast({
          title: 'Khóa tài khoản thành công!',
          description: 'Tài khoản đã được khóa.',
          variant: 'success'
        })
        break
      case 'UNLOCK':
        toast({
          title: 'Mở khóa tài khoản thành công!',
          description: 'Tài khoản đã được mở khóa.',
          variant: 'success'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xóa tài khoản thành công!',
          variant: 'success'
        })
        break
    }
  }

  const handleError = (error: any) => {
    const message = error.response?.data?.message || 'Có lỗi xảy ra!'
    toast({
      title: 'Có lỗi xảy ra!',
      description: message,
      variant: 'destructive'
    })
    console.log('[ACCOUNT]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationKey: ['ACCOUNT'],
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      switch (action) {
        case 'LOCK':
          return await AccountService.lockUser(id, { active: false, ...data })
        case 'UNLOCK':
          return await AccountService.lockUser(id, { active: true })
        case 'DELETE':
          return await AccountService.delete(id)
        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  return { mutate, ...rest }
}

export default useAccountMutation
