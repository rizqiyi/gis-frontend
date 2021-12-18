import React from 'react'
import { checkAuth } from '@/helpers/jwt-decode'
import PrivateDrawer from '@components/PrivateDrawer'
import { Navigate } from 'react-router-dom'

interface IPrivateDrawer {
  children: React.ReactNode
}

const Index: React.FC<IPrivateDrawer> = ({
  children,
}: IPrivateDrawer): JSX.Element => {
  if (checkAuth()) return <PrivateDrawer>{children}</PrivateDrawer>

  return <Navigate to="/" />
}

export default Index
