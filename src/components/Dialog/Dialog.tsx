/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Trash from '@illust/trash.svg'
import { Box, Typography } from '@mui/material'
import useStyles from './Dialog.styles'

interface IFormDialog {
  open: boolean
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: (e?: any, reason?: string) => void
  okText: string
  cancelText: string
  handleOk: (e: any) => void
  handleBackdrop?: (e: any) => void
  handleSuccess?: (e: any) => void
  dataToDialog?: any
  title: string
  desc: string
  titleSuccess?: string
  descSuccess?: string
  disabled?: boolean
  successBtnText?: string
  onSuccessAction?: boolean
}

const FormDialog: React.FC<IFormDialog> = ({
  open,
  handleClose,
  okText,
  cancelText,
  handleOk,
  dataToDialog = {},
  title,
  desc,
  handleBackdrop = () => {},
  handleSuccess = () => {},
  disabled = false,
  onSuccessAction = false,
  titleSuccess = '',
  descSuccess = '',
  successBtnText = '',
}: IFormDialog): JSX.Element => {
  const classes = useStyles()

  return (
    <Dialog
      sx={{
        borderRadius: '12px',
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: onSuccessAction ? '500px' : 'inherit',
          boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
        },
      }}
      onBackdropClick={handleBackdrop}
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Trash} alt="trash" />
        <Box sx={{ mt: '10px', textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {onSuccessAction ? titleSuccess : title}
          </Typography>
        </Box>
        <Box sx={{ mt: '10px', color: '#9E9E9E', mb: '10px' }}>
          <Typography variant="caption">
            {onSuccessAction ? descSuccess : desc}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: '30px 40px 30px 40px',
          gap: '20px',
          borderTop: '1px solid #DDDFE5',
          ...(onSuccessAction
            ? { display: 'flex', justifyContent: 'center' }
            : {}),
        }}
      >
        {onSuccessAction ? (
          <Button
            disableElevation
            variant="contained"
            className={classes.successButton}
            onClick={handleSuccess}
          >
            <Typography variant="body2" fontWeight={600}>
              {successBtnText}
            </Typography>
          </Button>
        ) : (
          <>
            <Button
              disabled={disabled}
              className={classes.cancelButton}
              onClick={() => handleClose()}
            >
              <Typography variant="body2" fontWeight={600}>
                {cancelText}
              </Typography>
            </Button>
            <Button
              disabled={disabled}
              className={classes.acceptButton}
              onClick={() => handleOk(dataToDialog)}
            >
              <Typography variant="body2" fontWeight={600}>
                {okText}
              </Typography>
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default React.memo(FormDialog)
