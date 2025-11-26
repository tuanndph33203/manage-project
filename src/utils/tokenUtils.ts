import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true
  try {
    const bufferTime: number = 5 * 60 * 1000
    const decoded = jwtDecode<{ exp: number }>(token)
    return decoded.exp * 1000 < Date.now() + bufferTime
  } catch (e) {
    return true
  }
}
