import React from 'react'
import { Button, Box, Skeleton, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate, useParams } from 'react-router-dom'
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
        >
          <Typography variant="subtitle2">Hapus</Typography>
        </Button>
      )}
    </Box>
  )
}

export default ActionButton
