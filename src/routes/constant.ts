import { lazy } from 'react'

export default [
  {
    path: '/',
    component: lazy(() => import('@pages/Root')),
    exact: true,
  },
  {
    path: '/login',
    component: lazy(() => import('@pages/Login')),
    exact: true,
  },
]
