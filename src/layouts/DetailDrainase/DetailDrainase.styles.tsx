import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  editButton: {
    background: '#D8F2FF',
    minHeight: '44px',
    width: '100%',
    borderRadius: '12px',
    color: theme.palette.primary.main,
    '&:hover': {
      background: '#D8F2FF',
      color: theme.palette.primary.main,
    },
  },
  deleteButton: {
    background: '#FFEDF0',
    minHeight: '44px',
    width: '100%',
    borderRadius: '12px',
    color: '#EB5757',
    '&:hover': {
      background: '#FFEDF0',
      color: '#EB5757',
    },
  },
  slider: {
    display: 'block',
    width: '400px',
  },
  sliderImage: {
    position: 'absolute',
    width: '400px',
    height: '250px',
    cursor: 'pointer',
    background:
      'linear-gradient(0deg, rgba(61, 61, 61, 0.72), rgba(61, 61, 61, 0.72))',
    top: 0,
    bottom: 0,
  },
}))

export default useStyles
