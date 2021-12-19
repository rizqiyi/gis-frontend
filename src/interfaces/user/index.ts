export interface IUser {
  id: number
  email: string
  avatar: string
  avatar_id: string
  username: string
  fullname: string
  manage: string
  role_name: string
  createdAt: string
  updatedAt: string
}

export interface ILogin {
  username: string
  password: string
  rememberMe: boolean
}
