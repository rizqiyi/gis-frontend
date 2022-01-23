/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, Dispatch } from 'react'
import api from '@services/common'
import { IUserAPI } from '@/interfaces/user'
import { getAccessToken } from '@/helpers/jwt-decode'

interface IUseUsers {
  users: IUserAPI | null
  loading: boolean
  message: unknown
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setUsers: Dispatch<React.SetStateAction<IUserAPI | null>>
}

const useUsers = (deps: any[] = []): IUseUsers => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<IUserAPI | null>(null)
  const [message, setMessage] = useState<unknown>({})

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)

      try {
        const response = await api({
          method: 'get',
          url: '/users',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getAccessToken(),
          },
        })

        const { data } = response

        setUsers(data as IUserAPI)

        setLoading(false)

        setMessage({})
      } catch (err: unknown) {
        setLoading(false)

        setUsers(null)

        setMessage(err)
      }
    }

    fetchUsers()
  }, [...deps])

  return { users, loading, message, setLoading, setMessage, setUsers }
}

export default useUsers
