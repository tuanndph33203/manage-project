import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const useCheckPermissions = (requiredRoles: string[]): boolean | null => {
  const { user } = useAuth()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    if (user === null) {
      const timeout = setTimeout(() => {
        setHasPermission(false)
      }, 10000)
      return () => clearTimeout(timeout)
    }
    if (!user?.role) {
      setHasPermission(false)
      return
    }
    const isAllowed = requiredRoles.includes(user.role)
    setHasPermission(isAllowed)
  }, [user, requiredRoles])

  return hasPermission
}

export default useCheckPermissions
