import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@components/Input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'

const Drainase = (): JSX.Element => {
  const navigate = useNavigate()
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
            onSubmit={(e) => console.log(e)}
          >
            {() => (
              <Form>
                <Box sx={{ display: 'flex' }}>
                  <Input
                    placeholder="Cari Ruas Jalan, Kecamatan Kabupaten"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: <SearchOutlinedIcon />,
                    }}
                    name="search"
                    id="search"
                    variant="filled"
                    fullWidth
                    required
                  />
                  {/* <Button
                    sx={{ width: '56px', height: '56px' }}
                    aria-label="search"
                    startIcon={<FilterAltOutlinedIcon fontSize="inherit" />}
                  >
                    t
                  </Button> */}
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
    </Box>
  )
}

export default Drainase
