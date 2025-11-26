import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from '@/hooks/useLocalStorage'
import { IEmployee } from '@/interface/employee'
import { useSingleEmployeeQuery } from '@/hooks/querys/useEmployeeQuery'

interface AuthContextType {
  user: IEmployee | null
  login: (token: string) => void
  logout: () => void
  updateUser: (updatedUserData: Partial<IEmployee>) => void
  isLoading: boolean
  token: string | null
  setToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null
  try {
    const decoded = jwtDecode<{ userId: string }>(token)
    return decoded.userId || null
  } catch (error) {
    console.error('Token không hợp lệ:', error)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('user', null)
  const [id, setId] = useState<string | null>(null)
  const [user, setUser] = useState<IEmployee | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useSingleEmployeeQuery(id ?? '')
  const login = (newToken: string) => {
    setToken(newToken)
    setId(getUserIdFromToken(newToken))
  }

  const logout = () => {
    setToken(null)
    removeToken()
    setUser(null)
    setId(null)
  }

  const updateUser = (updatedUserData: Partial<IEmployee>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUserData }) as IEmployee)
  }
  useEffect(() => {
    if (token) {
      const userId = getUserIdFromToken(token)
      setId(userId)
    } else {
      setIsInitialized(true)
    }
  }, [token])

  useEffect(() => {
    if (data) {
      setUser(data.data)
      setIsInitialized(true)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser, token, setToken }}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext phải được sử dụng trong AuthProvider')
  }
  return context
}
