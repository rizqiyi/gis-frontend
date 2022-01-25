/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { getAccessToken, getCurrentUser } from '@/helpers/jwt-decode'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { FastField, Form, Formik } from 'formik'
import Input from '@/components/Input'
import axios from 'axios'
import CSnackbar from '@/components/Snackbar'
import { passwordValidation } from '@/validations/users'
import VisiblePasswordIcon from './partials/VisiblePasswordIcon'
import fields from './constant'

const SettingsPassword = (): JSX.Element => {
  const user = getCurrentUser()
  const [updateStatus, setUpdateStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  return (
    <Box>
      <Breadcrumbs additionalDetailText={user.fullname} />
      <Paper
        sx={{
          width: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={0}
      >
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            verifyNewPassword: '',
          }}
          validationSchema={passwordValidation}
          onSubmit={async (v, { setSubmitting, resetForm }) => {
            try {
              const res = await axios.put(
                `${process.env.REACT_APP_API_URI_PROD}/users/update/me/pwd`,
                v,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': getAccessToken(),
                  },
                }
              )

              setResponseMsg(res.data.message)

              setUpdateStatus({
                error: false,
                success: true,
              })

              resetForm({})

              setSubmitting(false)
            } catch (err: any) {
              setResponseMsg(err.response.data.message)

              setUpdateStatus({
                error: true,
                success: false,
              })

              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <Box padding="48px">
                {fields.map((field, idx: number) => {
                  const isPasswordIncorrect: boolean =
                    field.name === 'password' &&
                    responseMsg === 'Password lama salah'

                  return (
                    <Box
                      key={field.name}
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
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
                          <span style={{ color: 'red', marginLeft: '5px' }}>
                            *
                          </span>
                        </Typography>
                      </Box>
                      <Box sx={{ width: '85%' }}>
                        <FastField
                          component={Input}
                          required
                          isErrorOccured={isPasswordIncorrect}
                          customMsg="Password lama salah"
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
                          disabled={isSubmitting}
                          placeholder={field.placeholder}
                          name={field.name}
                          id={field.name}
                          onChange={handleChange}
                          variant="filled"
                          fullWidth
                        />
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box borderBottom="1px solid #DDDFE5" marginBottom="24px" />
              <Box padding="0 48px 24px 48px">
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  color="success"
                  variant="contained"
                  disableElevation
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    color: 'white',
                    minHeight: '50px',
                    padding: '0 24px',
                    borderRadius: '12px',
                  }}
                >
                  <Typography sx={{ ml: '10px' }} variant="subtitle2">
                    Simpan Perubahan
                  </Typography>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
      <CSnackbar
        open={updateStatus.success}
        status="success"
        onClose={() =>
          setUpdateStatus({
            success: false,
            error: false,
          })
        }
        autoHideDuration={3000}
        message={`${responseMsg}. Silakan login kembali`}
      />
      <CSnackbar
        open={updateStatus.error}
        status="error"
        onClose={() =>
          setUpdateStatus({
            success: false,
            error: false,
          })
        }
        autoHideDuration={3000}
        message="Gagal mengubah password"
      />
    </Box>
  )
}

export default SettingsPassword
