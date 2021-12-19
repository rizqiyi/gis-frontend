import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  cancelButton: {
    backgroundColor: '#FAFAFA',
    color: '#757575',
    minHeight: '44px',
    padding: '0 24px',
    width: '181px',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
  },
  acceptButton: {
    backgroundColor: '#EB5757',
    color: '#ffffff',
    minHeight: '44px',
    padding: '0 24px',
    width: '181px',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#EB5757',
    },
  },
}))

export default useStyles
