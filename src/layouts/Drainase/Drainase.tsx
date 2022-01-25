import React, { useState } from 'react'
import { Box, Button, Fade, Typography } from '@mui/material'
import Input from '@components/Input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import Table from '@components/Table'
import { useDrainase } from '@services/hooks/dashboard'
import api from '@/services/common'
import { getAccessToken } from '@/helpers/jwt-decode'
import CSnackbar from '@/components/Snackbar'
import FilterIc from '@icons/filter-ic.svg'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Select from '@/components/Select'
import moment from 'moment'
import { headData, sortScore } from './constant'

const Drainase = (): JSX.Element => {
  const navigate = useNavigate()
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [formAppear, setFormAppear] = useState<boolean>(false)
  const [domain, setDomain] = useState<{ [key: string]: string | boolean }>({
    start_date: '',
    end_date: '',
    is_published: '',
  })
  const { drainase } = useDrainase(
    false,
    [deleteStatus, domain.start_date, domain.end_date, domain.is_published],
    domain
  )
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
                  <Button
                    onClick={() => setFormAppear(!formAppear)}
                    sx={{
                      minWidth: '56px',
                      borderRadius: '12px',
                      maxHeight: '56px',
                      padding: 0,
                      marginLeft: '18px',
                      boxShadow: '0px 12px 24px rgba(31, 169, 231, 0.12)',
                      backgroundColor: (theme) => theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.secondary.main,
                      },
                    }}
                  >
                    <img src={FilterIc} alt="filter-ic" />
                  </Button>
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
          borderBottom: '1px solid #DAF3FF',
          margin: '30px 0 ',
        }}
      />
      <Formik
        initialValues={{ startDate: '', endDate: '', is_published: '2' }}
        onSubmit={(e) => {
          const v = {
            start_date: moment(e.startDate).format('YYYY-MM-DD'),
            end_date: moment(e.endDate).format('YYYY-MM-DD'),
            is_published: e.is_published === '2' ? '' : Boolean(e.is_published),
          }

          setDomain(v)
        }}
      >
        {({ setFieldValue, values, handleChange }) => (
          <Form>
            <Fade in={formAppear}>
              <Box
                sx={{
                  margin: '40px 0',
                  display: formAppear ? 'block' : 'none',
                  transition: 'display 1s ease-in-out',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box display="flex" gap="40px" alignItems="flex-end">
                    <Box>
                      <Typography variant="subtitle2">Tanggal Awal</Typography>
                      <DatePicker
                        value={values.startDate}
                        onChange={(newValue: Date | null) =>
                          setFieldValue('startDate', newValue)
                        }
                        renderInput={(params) => (
                          <Input
                            sx={{ mt: '10px' }}
                            InputProps={{
                              disableUnderline: true,
                            }}
                            variant="filled"
                            id="startDate"
                            {...params}
                          />
                        )}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Tanggal Akhir</Typography>
                      <DatePicker
                        value={values.endDate}
                        onChange={(newValue: Date | null) =>
                          setFieldValue('endDate', newValue)
                        }
                        renderInput={(params) => (
                          <Input
                            sx={{ mt: '10px' }}
                            InputProps={{
                              disableUnderline: true,
                            }}
                            variant="filled"
                            id="endDate"
                            {...params}
                          />
                        )}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Status</Typography>
                      <Select
                        sx={{ mt: '10px', width: '260px' }}
                        id="is_published"
                        value={values.is_published}
                        name="is_published"
                        onChange={handleChange}
                        options={[
                          {
                            label: 'Pilih status',
                            value: 2,
                          },
                          {
                            label: 'Tampil',
                            value: 1,
                          },
                          {
                            label: 'Draft',
                            value: 0,
                          },
                        ]}
                      />
                    </Box>
                    <Box>
                      <Button
                        disableElevation
                        sx={{
                          color: '#FFFFFF',
                          boxShadow: '0px 12px 24px rgba(31, 169, 231, 0.12)',
                          minHeight: '52px',
                          borderRadius: '12px',
                          width: '109px',
                          mb: '1px',
                        }}
                        variant="contained"
                        type="submit"
                      >
                        <Typography variant="subtitle1">Filter</Typography>
                      </Button>
                    </Box>
                  </Box>
                </LocalizationProvider>
              </Box>
            </Fade>
          </Form>
        )}
      </Formik>
      <Table
        empty={drainase?.data?.length === 0}
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
