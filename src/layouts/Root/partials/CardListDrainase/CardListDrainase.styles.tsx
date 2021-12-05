import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  title: {
    color: '#616161',
    fontSize: '22px',
  },
  roadDescription: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
  },
  placeText: {
    color: '#757575',
    fontSize: '12px',
  },
  scrollStyle: {
    // eslint-disable-next-line no-useless-computed-key
    ['&::-webkit-scrollbar']: {
      width: '6px',
      height: 'auto',
    },
    // eslint-disable-next-line no-useless-computed-key
    ['&::-webkit-scrollbar-thumb']: {
      background: '#C2C2C2',
      borderRadius: '50px',
    },
    // eslint-disable-next-line no-useless-computed-key
    ['&::-webkit-scrollbar-track']: {
      background: '#F4F4F4',
      borderRadius: '50px',
    },
  },
}))

export default useStyles
