import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    borderBottom: 'none',
  },
  toggleExpandOpened: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  toggleExpand: {
    backgroundColor: '#FAFAFA',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
  },
  textTruncate: {
    fontSize: 'inherit',
    '-webkit-line-clamp': 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
    fontWeight: 600,
  },
}))

export default useStyles
