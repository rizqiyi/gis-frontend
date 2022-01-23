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

export interface IUserRead {
  username: string
  email: string
  manage: string
  fullname: string
  avatar: string
  createdAt: string
  updatedAt: string
  id: number
  role_name: string
}

export interface IUserAPI {
  previous_page: null | number
  current_page: number
  next_page: null | number
  total: number
  per_page: number
  data: IUserRead[]
  offset: number
  limit: number
}
