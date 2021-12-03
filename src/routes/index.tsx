import React from 'react'
import { BrowserRouter as AppRouter, Route, Routes } from 'react-router-dom'
import routes from './constant'

const Index = (): JSX.Element => {
  return (
    <AppRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </AppRouter>
  )
}

export default Index
