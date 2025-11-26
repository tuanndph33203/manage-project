import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/config/axios'
import useEmployeeMutation from './mutations/useEmployeeMutation'

const useListenUnauthorized = () => {
  const navigate = useNavigate()
  const { mutate } = useEmployeeMutation({ action: 'LOGOUT' })
  useEffect(() => {
    const axiosInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          mutate(undefined)
          navigate('/unauthorized', { replace: true })
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosInstance.interceptors.response.eject(axiosInterceptor)
    }
  }, [navigate, mutate])

  return null
}

export default useListenUnauthorized
