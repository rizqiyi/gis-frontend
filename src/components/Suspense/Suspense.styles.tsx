import { makeStyles } from '@mui/styles'
import { linearProgressClasses } from '@mui/material/LinearProgress'

const useStyles = makeStyles(() => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    position: 'absolute',
    left: '50%',
    zIndex: 2,
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    display: 'flex',
    alignItems: 'flex-start',
  },
  borderedImage: {
    boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
    width: '54px',
    height: '54px',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingWrapper: {
    width: '100%',
    marginTop: '30px',
  },
  loading: {
    height: '12px',
    borderRadius: '50px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#D8F2FF',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'linear-gradient(180deg, #62C1FA 0%, #1FA9E7 100%)',
    },
  },
}))

export default useStyles
