import React from 'react'
import { SnackbarProps, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface ISnackbarProps extends SnackbarProps {
  message: string
  status: 'success' | 'error' | 'info' | 'warning'
}

const CSnackbar: React.FC<ISnackbarProps> = ({
  message,
  status,
  ...rest
}: ISnackbarProps): JSX.Element => {
  return (
    <Snackbar {...rest}>
      <Alert severity={status} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CSnackbar
