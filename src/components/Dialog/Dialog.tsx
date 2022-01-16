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
  handleClose: () => void
  okText: string
  cancelText: string
  handleOk: (e: any) => void
  dataToDialog?: any
}

const FormDialog: React.FC<IFormDialog> = ({
  open,
  handleClose,
  okText,
  cancelText,
  handleOk,
  dataToDialog = {},
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
          boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
        },
      }}
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
            Anda yakin ingin menghapus Gambar ?
          </Typography>
        </Box>
        <Box sx={{ mt: '10px', color: '#9E9E9E', mb: '10px' }}>
          <Typography variant="caption">
            Data yang telah dihapus tidak dapat kembali
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: '30px 40px 30px 40px',
          gap: '20px',
          borderTop: '1px solid #DDDFE5',
        }}
      >
        <Button className={classes.cancelButton} onClick={handleClose}>
          <Typography variant="body2" fontWeight={600}>
            {cancelText}
          </Typography>
        </Button>
        <Button
          className={classes.acceptButton}
          onClick={() => handleOk(dataToDialog)}
        >
          <Typography variant="body2" fontWeight={600}>
            {okText}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default React.memo(FormDialog)
