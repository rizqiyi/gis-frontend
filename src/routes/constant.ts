import { lazy } from 'react'

export default [
  {
    path: '/login',
    component: lazy(() => import('@pages/Login')),
    exact: true,
  },
]
