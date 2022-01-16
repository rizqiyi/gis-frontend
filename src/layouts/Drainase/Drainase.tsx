import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@components/Input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import Table from '@components/Table'
import useDrainase from '@services/hooks/dashboard'
import api from '@/services/common'
import { getAccessToken } from '@/helpers/jwt-decode'
import CSnackbar from '@/components/Snackbar'
import { headData, sortScore } from './constant'

const Drainase = (): JSX.Element => {
  const navigate = useNavigate()
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const { drainase } = useDrainase(false, [deleteStatus])
  const [page, setPage] = useState<number>(drainase?.current_page || 0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    drainase?.per_page || 5
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))

    setPage(0)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ width: '455px' }}>
          <Formik
            initialValues={{ search: '' }}
            // eslint-disable-next-line no-console
            onSubmit={(e) => console.log(e)}
          >
            {({ handleChange }) => (
              <Form>
                <Box sx={{ display: 'flex' }}>
                  <Input
                    placeholder="Cari Ruas Jalan, Kecamatan Kabupaten"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: <SearchOutlinedIcon />,
                    }}
                    onChange={handleChange}
                    name="search"
                    id="search"
                    variant="filled"
                    fullWidth
                    required
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Box>
          <Button
            disableElevation
            sx={{
              color: '#FFFFFF',
              minHeight: '52px',
              borderRadius: '12px',
              width: '219px',
            }}
            variant="contained"
            onClick={() => navigate('/drainase/create')}
            startIcon={<AddCircleOutlineIcon />}
          >
            <Typography sx={{ ml: '10px' }} variant="subtitle2">
              Tambah Drainase
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          border: '1px solid #DAF3FF',
          margin: '30px 0 ',
        }}
      />
      <Table
        head={headData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e: unknown, p: number) => handleChangePage(e, p)}
        handleChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(e)
        }
        expandable
        sortData={sortScore}
        handleClickDelete={async (e, setLoading) => {
          setLoading({ [e]: true })

          try {
            await api({
              method: 'delete',
              url: `/drainase/delete/${e}`,
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getAccessToken(),
              },
            })

            setLoading({ [e]: false })

            setDeleteStatus({ success: true, error: false })
          } catch (err) {
            setLoading({ [e]: false })

            setDeleteStatus({ success: false, error: true })
          }
        }}
        rows={
          drainase?.data?.map((data) => ({
            ...data,
            left_drainase: {
              typical: data.left_typical,
              drainase_depth: data.left_drainase_depth,
              drainase_width: data.left_drainase_width,
              drainase_condition: data.left_drainase_condition,
            },
            right_drainase: {
              typical: data.right_typical,
              drainase_depth: data.right_drainase_depth,
              drainase_width: data.right_drainase_width,
              drainase_condition: data.right_drainase_condition,
            },
          })) || []
        }
      />
      <CSnackbar
        open={deleteStatus.success}
        status="success"
        onClose={() =>
          setDeleteStatus({
            success: false,
            error: false,
          })
        }
        autoHideDuration={3000}
        message="Berhasil menghapus drainase"
      />
      <CSnackbar
        open={deleteStatus.error}
        status="error"
        onClose={() =>
          setDeleteStatus({
            success: false,
            error: false,
          })
        }
        autoHideDuration={3000}
        message="Gagal menghapus drainase"
      />
    </Box>
  )
}

export default Drainase
