import React, { useState } from 'react'
import { useUsers } from '@/services/hooks/users'
import api from '@/services/common'
import { getAccessToken, getCurrentUser } from '@/helpers/jwt-decode'
import Table from '@/components/Table'
import { Box, Button, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import Input from '@components/Input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useNavigate } from 'react-router-dom'
import CSnackbar from '@/components/Snackbar'
import { headData, sortScore } from './constant'

const UserManagement = (): JSX.Element => {
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const navigate = useNavigate()
  const { users } = useUsers([deleteStatus])

  const [page, setPage] = useState<number>(users?.current_page || 0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(users?.per_page || 5)

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
    <>
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
                    placeholder="Cari Nama User"
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
              boxShadow: '0px 12px 24px rgba(31, 169, 231, 0.12)',
              minHeight: '52px',
              borderRadius: '12px',
              width: '200px',
            }}
            variant="contained"
            onClick={() => navigate('/user-management/create')}
            startIcon={<AddCircleOutlineIcon />}
          >
            <Typography sx={{ ml: '10px' }} variant="subtitle2">
              Tambah User
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid #DAF3FF',
          margin: '30px 0 ',
        }}
      />
      <Table
        empty={
          users?.data?.filter((data) => data?.id !== +getCurrentUser().id)
            .length === 0
        }
        withAvatar
        head={headData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e: unknown, p: number) => handleChangePage(e, p)}
        handleChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(e)
        }
        sortData={sortScore}
        handleClickDelete={async (e, setLoading) => {
          setLoading({ [e]: true })

          try {
            await api({
              method: 'delete',
              url: `/users/delete/${e}`,
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
        rows={(users?.data || []).filter(
          (data) => data?.id !== +getCurrentUser().id
        )}
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
        message="Berhasil menghapus user"
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
        message="Gagal menghapus user"
      />
    </>
  )
}

export default UserManagement
