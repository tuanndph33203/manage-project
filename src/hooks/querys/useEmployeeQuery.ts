import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { IApiResponse } from '@/interface/apiRespose'
import { IEmployee } from '@/interface/employee'
import { EmployeeService } from '@/services/employee'
import { useQuery } from '@tanstack/react-query'

export const useSingleEmployeeQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['EMPLOYEE', id],
    queryFn: async (): Promise<IApiResponse<IEmployee>> => {
      const response = await EmployeeService.getById(id)
      return response.data
    },
    enabled: !!id
  })
  return { data, ...rest }
}

export const useMutipleEmployeeQuery = (pagination?: any, searchTerm: string = '') => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['EMPLOYEE', pageIndex, searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        const response = await EmployeeService.getByFullName(searchTerm)
        return response.data
      } else if (pagination) {
        const response = await EmployeeService.getLimited({ pageIndex, pageSize })
        return response.data
      } else {
        const response = await EmployeeService.getAll()
        return response.data
      }
    }
  })
  return { data, ...rest }
}
