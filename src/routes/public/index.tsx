import React, { useEffect } from 'react'
import { checkAuth } from '@/helpers/jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'

interface IPublicDrawer {
  children: React.ReactNode
  path: string
}

const Index: React.FC<IPublicDrawer> = ({
  children,
  path,
}: IPublicDrawer): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!checkAuth()) {
      localStorage.removeItem('tokenAccess')

      localStorage.removeItem('userAccess')

      navigate('/')
    }
  }, [])

  if (checkAuth() && path !== '/') return <Navigate to="/dashboard" />

  return <>{children}</>
}

export default Index
