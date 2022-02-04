import React, { useEffect } from 'react'
import { checkAuth } from '@/helpers/jwt-decode'
import PrivateDrawer from '@components/PrivateDrawer'
import { Navigate, useNavigate } from 'react-router-dom'

interface IPrivateDrawer {
  children: React.ReactNode
}

const Index: React.FC<IPrivateDrawer> = ({
  children,
}: IPrivateDrawer): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!checkAuth()) {
      localStorage.removeItem('tokenAccess')

      localStorage.removeItem('userAccess')

      navigate('/')
    }
  }, [])

  if (checkAuth()) return <PrivateDrawer>{children}</PrivateDrawer>

  return <Navigate to="/" />
}

export default Index
