import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1FA9E7' },
    secondary: { main: '#1393CD' },
    success: { main: '#33C863' },
    error: { main: '#EB5757' },
    background: { default: '#F4FBFF', paper: '#FFFFFF' },
  },
})

export default responsiveFontSizes(theme)
