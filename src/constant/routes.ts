import { lazy } from 'react'

const TIMEOUT = 700

export default [
  {
    path: '/',
    private: false,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Root')
    }),
    exact: true,
  },
  {
    path: '/login',
    private: false,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Login')
    }),
    exact: true,
  },
  {
    path: '/dashboard',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Dashboard')
    }),
    exact: true,
  },
  {
    path: '/drainase',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Drainase')
    }),
    exact: true,
  },
  {
    path: '/user-management',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/UserManagement')
    }),
    exact: true,
  },
  {
    path: '/settings',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Settings')
    }),
    exact: true,
  },
]
