import React, { useState } from 'react'
import { Button, Box, Skeleton, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import FormDialog from '@components/Dialog'
import { getAccessToken } from '@/helpers/jwt-decode'
import api from '@/services/common'
import useStyles from '../../DetailDrainase.styles'

interface IActionButton {
  loading: boolean
}

const ActionButton: React.FC<IActionButton> = ({
  loading,
}: IActionButton): JSX.Element => {
  const classes = useStyles()
  const { id }: { [key: string]: string | undefined } = useParams()
  const navigate = useNavigate()
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Box
      padding="0 40px 32px 40px"
      display="flex"
      alignItems="center"
      gap="40px"
    >
      {loading ? (
        <Skeleton
          sx={{ borderRadius: '12px' }}
          variant="rectangular"
          width="100%"
          height="44px"
        />
      ) : (
        <Button
          className={classes.editButton}
          disableElevation
          variant="contained"
          fullWidth
          onClick={() => navigate(`/drainase/edit/${id}`)}
          startIcon={<EditOutlinedIcon />}
        >
          <Typography variant="subtitle2">Ubah</Typography>
        </Button>
      )}
      {loading ? (
        <Skeleton
          sx={{ borderRadius: '12px' }}
          variant="rectangular"
          width="100%"
          height="44px"
        />
      ) : (
        <Button
          fullWidth
          className={classes.deleteButton}
          disableElevation
          variant="contained"
          startIcon={<DeleteOutlinedIcon />}
          onClick={() => setOpen(true)}
        >
          <Typography variant="subtitle2">Hapus</Typography>
        </Button>
      )}
      <FormDialog
        title="Anda yakin ingin menghapus data drainase ?"
        desc="Data yang telah dihapus tidak dapat kembali"
        titleSuccess="Berhasil menghapus data drainase"
        descSuccess="data telah terhapus, silahkan kembali ke list"
        successBtnText="Kembali ke list"
        handleSuccess={() => navigate('/drainase')}
        open={open}
        okText="Hapus"
        cancelText="Cancel"
        onSuccessAction={deleteStatus.success}
        disabled={isLoading}
        handleClose={(_, reason: string | undefined) => {
          if (
            (isLoading || deleteStatus.success) &&
            reason &&
            reason === 'backdropClick'
          )
            return

          setOpen(false)
        }}
        handleOk={async () => {
          setIsLoading(true)

          try {
            await api({
              method: 'delete',
              url: `/drainase/delete/${id}`,
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getAccessToken(),
              },
            })

            setIsLoading(false)

            setDeleteStatus({ success: true, error: false })
          } catch (err) {
            setIsLoading(false)

            setDeleteStatus({ success: false, error: true })

            // eslint-disable-next-line no-console
            console.error(err)
          }
        }}
      />
    </Box>
  )
}

export default ActionButton
