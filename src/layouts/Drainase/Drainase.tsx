import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@components/Input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import Table from '@components/Table'
import useDrainase from '@services/hooks/dashboard'

const Drainase = (): JSX.Element => {
  const navigate = useNavigate()
  const { drainase } = useDrainase()
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
        head={[
          {
            title: 'Tanggal Dibuat',
            selector: 'createdAt',
            style: {
              minWidth: '120px',
            },
          },
          { title: 'Kabupaten', selector: 'district' },
          { title: 'Kecamatan', selector: 'sub_district' },
          {
            title: 'Nama Ruas Jalan',
            selector: 'street_name',
          },
          {
            title: 'Lebar Jalan',
            selector: 'street_width',
          },
          { title: 'STA', selector: 'sta' },
          { title: 'Status', selector: 'is_published' },
        ]}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(e: unknown, p: number) => handleChangePage(e, p)}
        handleChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(e)
        }
        detailUrl="/drainase"
        expandable
        sortData={{
          createdAt: 1,
          district: 2,
          sub_district: 3,
          street_name: 4,
          street_width: 5,
          sta: 6,
          is_published: 7,
        }}
        rows={
          drainase?.data.map((data) => ({
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
    </Box>
  )
}

export default Drainase
