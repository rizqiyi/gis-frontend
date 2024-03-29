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
    path: '/drainase/detail/:id',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/DetailDrainase')
    }),
    exact: true,
  },
  {
    path: '/drainase/edit/:id',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/EditDrainase')
    }),
    exact: true,
  },
  {
    path: '/drainase/create',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/CreateDrainase')
    }),
    exact: true,
  },
  {
    path: '/shapefile',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/Shapefile')
    }),
    exact: true,
  },
  {
    path: '/user-management/edit/:id',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/EditUserManagement')
    }),
    exact: true,
  },
  {
    path: '/user-management/detail/:id',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/DetailUserManagement')
    }),
    exact: true,
  },
  {
    path: '/user-management/create',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/CreateUserManagement')
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
    path: '/settings/password',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/SettingsPassword')
    }),
    exact: true,
  },
  {
    path: '/settings/profile',
    private: true,
    component: lazy(async () => {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

      return import('@pages/SettingsProfile')
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
