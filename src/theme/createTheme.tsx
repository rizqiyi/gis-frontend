import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#1FA9E7' },
      secondary: { main: '#1393CD' },
      success: { main: '#33C863' },
      error: { main: '#EB5757' },
      text: {
        primary: '#3D3D3D',
        secondary: '#404040',
        disabled: '#929292',
      },
      background: { default: '#F4FBFF', paper: '#FFFFFF' },
    },
    typography: {
      button: {
        textTransform: 'none',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '15px',
      },
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  })
)

export default theme
