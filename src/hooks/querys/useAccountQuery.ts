import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { AccountService } from '@/services/account'
import { useQuery } from '@tanstack/react-query'

const useAccountQuery = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Account id is required')
      }
      return await AccountService.getById(id)
    }
  })
  return { data, ...rest }
}

export default useAccountQuery

export const useAccountQueryLimited = (pagination: any) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT', pageIndex, pageSize],
    queryFn: async () => {
      const res = await AccountService.getAll({ pageIndex, pageSize })
      return res.data
    }
  })
  return { data, ...rest }
}

export const useAccountCount = (period: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT'],
    queryFn: async () => {
      const res = await AccountService.count(period)
      return res.data
    }
  })
  return { data, ...rest }
}
