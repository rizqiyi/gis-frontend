import { lazy } from 'react'

const TIMEOUT = 700

export default [
  {
    path: '/',
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Root')
    }),
    exact: true,
  },
  {
    path: '/login',
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Login')
    }),
    exact: true,
  },
]
