import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  activeText: {
    cursor: 'default',
    color: theme.palette.text.primary,
  },
  menuText: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}))

export default useStyles
