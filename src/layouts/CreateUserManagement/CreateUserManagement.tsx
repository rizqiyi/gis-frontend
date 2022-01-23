/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { Form, Formik } from 'formik'
import Input from '@/components/Input'
import Select from '@/components/Select'
import InfoIcon from '@icons/info-ic.svg'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DefaultProfile from '@illust/profile-default.svg'
import VisiblePasswordIcon from './partials/VisiblePasswordIcon'
import fields from './constant'

const CreateUserManagement = (): JSX.Element => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  const switchField = (p: any) => {
    switch (p.type) {
      case 'input':
        return (
          <Input
            required
            disabled={p.isSubmitting}
            placeholder={p.placeholder}
            name={p.name}
            id={p.name}
            onChange={p.handleChange}
            variant="filled"
            value={p.values[p.name] || ''}
            fullWidth
          />
        )

      case 'input-password':
        return (
          <Input
            type={visiblePassword ? 'text' : 'password'}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <VisiblePasswordIcon
                  visiblePassword={visiblePassword}
                  setVisiblePassword={setVisiblePassword}
                />
              ),
            }}
            disabled={p.isSubmitting}
            placeholder={p.placeholder}
            name={p.name}
            id={p.name}
            onChange={p.handleChange}
            variant="filled"
            fullWidth
          />
        )

      case 'select':
        return (
          <Select
            required
            disabled={p.isSubmitting}
            placeholder={p.placeholder}
            name={p.name}
            id={p.name}
            onChange={p.handleChange}
            variant="filled"
            value={p?.values[p.name] || ''}
            options={p.options}
            fullWidth
          />
        )

      default:
        return null
    }
  }

  return (
    <Box>
      <Breadcrumbs additionalActionText="User Baru" />
      <Paper elevation={0} sx={{ p: '48px' }}>
        <Formik
          enableReinitialize
          initialValues={{
            fullname: '',
            email: '',
            manage: '',
            role_name: '',
          }}
          // eslint-disable-next-line no-console
          onSubmit={() => console.log('fired')}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Box
                display="flex"
                gap="100px"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box width="75%">
                  {fields.map((field, idx: number) => (
                    <Box
                      key={field.name}
                      sx={{
                        display: 'flex',
                        alignItems:
                          field.name === 'password' ? 'start' : 'center',
                        width: '100%',
                        marginTop: idx > 0 ? '40px' : 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: '15%',
                          maxWidth: '105px',
                        }}
                      >
                        <Typography fontWeight={600} variant="subtitle2">
                          {field.label}
                          {field.name !== 'password' && (
                            <span style={{ color: 'red', marginLeft: '5px' }}>
                              *
                            </span>
                          )}
                        </Typography>
                      </Box>
                      {field.name === 'password' ? (
                        <Box display="flex" flexDirection="column" width="85%">
                          <Box>
                            {switchField({
                              isSubmitting,
                              handleChange,
                              ...field,
                            } as any)}
                          </Box>
                          <Box marginTop="16px" color="#9E9E9E" display="flex">
                            <img src={InfoIcon} alt="info" />
                            <Typography
                              sx={{ marginLeft: '15px' }}
                              fontWeight={600}
                              variant="caption"
                            >
                              Kosongi password baru jika tidak ingin mengganti
                              password
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ width: '85%' }}>
                          {switchField({
                            isSubmitting,
                            handleChange,
                            values,
                            ...field,
                          } as any)}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                <Box
                  width="25%"
                  borderRadius="12px"
                  sx={{
                    background:
                      'linear-gradient(180deg, #1CA0DB 0%, #1393CD 100%)',
                    padding: '30px 35px',
                  }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    width="170px"
                    height="170px"
                    src={DefaultProfile}
                    alt="default"
                  />
                  <Typography
                    sx={{ color: 'white', marginTop: '28px' }}
                    fontWeight={400}
                    textAlign="center"
                    variant="subtitle2"
                  >
                    Pastikan Gambar Memiliki Ratio 1:1 dan format foto JPG,JPEG
                    dan PNG
                  </Typography>
                  <Button
                    startIcon={<SaveOutlinedIcon />}
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{
                      width: '100%',
                      mt: '28px',
                      color: 'white',
                      minHeight: '50px',
                      padding: '0 24px',
                      borderRadius: '12px',
                    }}
                  >
                    <Typography sx={{ ml: '10px' }} variant="subtitle2">
                      Upload Foto
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box borderBottom="1px solid #DDDFE5" margin="40px 0" />
              <Box>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  color="success"
                  variant="contained"
                  disableElevation
                  type="submit"
                  sx={{
                    color: 'white',
                    minHeight: '50px',
                    padding: '0 24px',
                    borderRadius: '12px',
                  }}
                >
                  <Typography sx={{ ml: '10px' }} variant="subtitle2">
                    Simpan Drainase
                  </Typography>
                </Button>
                <Button
                  startIcon={<DeleteOutlinedIcon />}
                  color="error"
                  variant="contained"
                  disableElevation
                  sx={{
                    color: 'white',
                    minHeight: '50px',
                    padding: '0 24px',
                    borderRadius: '12px',
                    marginLeft: '32px',
                  }}
                >
                  <Typography sx={{ ml: '10px' }} variant="subtitle2">
                    Hapus User
                  </Typography>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

export default CreateUserManagement
