import React, { useState } from 'react'
import Table from '@/components/Table'
import api from '@/services/common'
import { useDrainase } from '@/services/hooks/dashboard'
import CSnackbar from '@/components/Snackbar'
import { getAccessToken, getCurrentUser } from '@/helpers/jwt-decode'
import { useUsers } from '@/services/hooks/users'
import { Box } from '@mui/material'
import {
  headDataDrainase,
  sortScoreDrainase,
  headDataUsers,
  sortScoreUsers,
} from './constant'
import Title from './partials/Title/title'
import Headers from './partials/Headers/headers'

const Dashboard = (): JSX.Element => {
  const { drainase, loading } = useDrainase(false, [], { order_by: 'desc' })
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const { users, loading: loadingUser } = useUsers([], { order_by: 'desc' })
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))

    setPage(0)
  }

  const [rowsPerPageUsers, setRowsPerPageUsers] = useState<number>(5)
  const [pageUsers, setPageUsers] = useState<number>(0)

  const handleChangePageUsers = (event: unknown, newPage: number) => {
    setPageUsers(newPage)
  }

  const handleChangeRowsPerPageUsers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageUsers(parseInt(event.target.value, 10))

    setPageUsers(0)
  }

  return (
    <Box>
      <Headers />
      <Box borderBottom="2px solid #DAF3FF" margin="30px 0" />
      <Title uniq="drainase" />
      <Table
        uniq="drainase"
        empty={drainase?.data?.length === 0}
        head={headDataDrainase}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e: unknown, p: number) => handleChangePage(e, p)}
        handleChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(e)
        }
        loading={loading}
        expandable
        sortData={sortScoreDrainase}
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

            setResponseMsg('Berhasil menghapus drainase')

            setDeleteStatus({ success: true, error: false })
          } catch (err) {
            setLoading({ [e]: false })

            setResponseMsg('Gagal menghapus drainase')

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
      <Box borderBottom="2px solid #DAF3FF" margin="30px 0" />
      <Title uniq="user-management" />
      <Table
        uniq="user-management"
        empty={
          users?.data?.filter((data) => data?.id !== +getCurrentUser().id)
            .length === 0
        }
        withAvatar
        head={headDataUsers}
        page={pageUsers}
        rowsPerPage={rowsPerPageUsers}
        handleChangePage={(e: unknown, p: number) =>
          handleChangePageUsers(e, p)
        }
        handleChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPageUsers(e)
        }
        loading={loadingUser}
        sortData={sortScoreUsers}
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

            setResponseMsg('Berhasil menghapus user')

            setDeleteStatus({ success: true, error: false })
          } catch (err) {
            setLoading({ [e]: false })

            setResponseMsg('Gagal menghapus user')

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
        message={responseMsg}
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
        message={responseMsg}
      />
    </Box>
  )
}

export default Dashboard
