import React, { Suspense } from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import SuspenseComponent from '@components/Suspense'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom'
import App from './App'
import theme from './theme'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<SuspenseComponent />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
  undefined
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
