import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  activeButton: {
    border: '2px solid #1FA9E7',
    background: '#F4FBFF',
    color: theme.palette.primary.main,
  },
  inactiveButton: {
    border: '2px solid #DDDFE5',
    backgroundColor: 'white',
    color: '#757575',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}))

export default useStyles
