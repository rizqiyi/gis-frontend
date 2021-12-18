import React from 'react'
import { BrowserRouter as AppRouter, Route, Routes } from 'react-router-dom'
import routes from '@constant/routes'
import Private from './private'
import Public from './public'

const Index = (): JSX.Element => {
  return (
    <AppRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.private ? (
                <Private>
                  <route.component />
                </Private>
              ) : (
                <Public path={route.path}>
                  <route.component />
                </Public>
              )
            }
          />
        ))}
      </Routes>
    </AppRouter>
  )
}

export default Index
