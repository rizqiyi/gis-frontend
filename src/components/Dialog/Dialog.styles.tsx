import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
  successButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    minHeight: '44px',
    padding: '0 24px',
    width: '181px',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export default useStyles
