import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    position: 'absolute',
    zIndex: 2,
    top: '59px',
    margin: '0 32px',
    display: 'flex',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    zIndex: 2,
    top: '201px',
    margin: '0 32px',
  },
  logoutContainer: {
    position: 'relative',
    zIndex: 3,
    top: '80%',
  },
  rootMenu: {
    right: '40px',
  },
  borderedImage: {
    boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    padding: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cardMenuActive: {
    backgroundColor: '#7ACFFF',
  },
  cardMenu: {
    width: '100%',
    padding: '12px 17px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
  },
}))

export default useStyles
