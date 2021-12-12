import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  outerPaper: {
    width: 'fit-content',
    padding: '16px',
    borderRadius: '12px',
    marginTop: '12px',
  },
  innerPaper: {
    height: '64px',
    padding: '0 12px',
    borderRadius: '10px',
    border: '0.8px solid #EDEDED',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '175px',
    [theme.breakpoints.down('xl')]: {
      width: '130px',
    },
  },
}))

export default useStyles
