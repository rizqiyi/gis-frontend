import React from 'react'
import { checkAuth } from '@/helpers/jwt-decode'
import { Navigate } from 'react-router-dom'

interface IPublicDrawer {
  children: React.ReactNode
  path: string
}

const Index: React.FC<IPublicDrawer> = ({
  children,
  path,
}: IPublicDrawer): JSX.Element => {
  if (checkAuth() && path !== '/') return <Navigate to="/dashboard" />

  return <>{children}</>
}

export default Index
