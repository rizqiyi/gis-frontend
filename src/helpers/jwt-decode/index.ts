import { IUser } from '@interfaces/user'
import decode, { JwtPayload } from 'jwt-decode'

export const getUserData = (): IUser | string | null =>
  JSON.parse(localStorage.getItem('userData') as string)

export const checkAuth = (): boolean => {
  const jwtToken = localStorage.getItem('tokenAccess')

  if (!jwtToken) return false

  try {
    const { exp } = decode<JwtPayload>(jwtToken)

    if ((exp as number) < new Date().getTime() / 1000) {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}
