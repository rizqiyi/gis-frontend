import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  maps: {
    width: '100%',
    height: '320px',
    [theme.breakpoints.down('sm')]: {
      height: '520px',
    },
  },
  LeftContentWrapper: {
    background: theme.palette.background.default,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      height: '150px',
      padding: '120px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '80px',
    },
  },
  RightContentWrapper: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      height: 'auto',
      padding: '40px 32px 20px 32px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '40px 32px',
    },
  },
  paperContent: {
    width: '400px',
    marginTop: '40px',
    padding: '40px 32px',
    border: '1.5px solid #DDDFE5',
    boxShadow: '0px 16px 40px rgba(112, 144, 176, 0.2)',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: '24px',
      padding: '30px 32px',
    },
  },
  greetingText: {
    fontSize: '40px',
    color: theme.palette.text.primary,
  },
  button: {
    height: '44px',
    borderRadius: '12px',
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  separateText: {
    color: theme.palette.primary.main,
  },
  textCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default useStyles
