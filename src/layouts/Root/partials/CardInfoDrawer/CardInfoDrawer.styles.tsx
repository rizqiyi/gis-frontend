import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  paperStyles: {
    width: '100%',
    height: '195px',
    borderRadius: '12px',
  },
  waterSplash: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
  drainasePaper: {
    background: 'linear-gradient(180deg, #1B99D1 0%, #1290C8 100%)',
    borderRadius: '8px',
    height: '32px',
    padding: '4px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCount: {
    fontSize: '64px',
    color: '#FFFFFF',
  },
  textSum: {
    fontSize: '16px',
    color: '#FFFFFF',
  },
  drainaseText: {
    fontSize: '12px',
    color: '#FFFFFF',
  },
}))

export default useStyles
