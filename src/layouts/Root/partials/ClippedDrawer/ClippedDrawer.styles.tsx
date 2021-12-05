import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  title: {
    color: theme.palette.text.secondary,
    marginLeft: '10px',
  },
  loginButton: {
    background: theme.palette.background.default,
    width: '109px',
    height: '44px',
    borderRadius: '10px',
  },
}))

export default useStyles
