/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { FastField, Form, Formik } from 'formik'
import Input from '@/components/Input'
import { styled } from '@mui/material/styles'
import Select from '@/components/Select'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DefaultProfile from '@illust/profile-default.svg'
import { getAccessToken } from '@/helpers/jwt-decode'
import CSnackbar from '@/components/Snackbar'
import validation from '@/validations/users'
import axios from 'axios'
import VisiblePasswordIcon from './partials/VisiblePasswordIcon'
import fields, { IUserForm } from './constant'

const InputFile = styled('input')({
  display: 'none',
})

const CreateUserManagement = (): JSX.Element => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [file, setFile] = useState<FileList | null>(null)
  const [updateStatus, setUpdateStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [responseMsg, setResponseMsg] = useState<string>('')

  const switchField = (p: any) => {
    switch (p.type) {
      case 'input':
        return (
          <FastField
            component={Input}
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
          <FastField
            required
            component={Input}
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
          <FastField
            component={Select}
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
            username: '',
            email: '',
            manage: '',
            role_name: '',
            password: '',
            passwordVerify: '',
            avatar: '',
          }}
          validationSchema={validation}
          // eslint-disable-next-line no-console
          onSubmit={async (v, { setSubmitting, resetForm }) => {
            const form = new FormData()

            Object.keys(v).map((data: string) =>
              form.append(data, v[data as keyof IUserForm] as string | Blob)
            )

            if (v.avatar === '') form.delete('avatar')

            try {
              const res = await axios.post(
                `${process.env.REACT_APP_API_URI_PROD}/users/register`,
                form,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
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
          {({ isSubmitting, handleChange, values, setFieldValue }) => (
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
                        alignItems: 'center',
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
                      {field.name === 'password' ? (
                        <Box display="flex" flexDirection="column" width="85%">
                          <Box>
                            {switchField({
                              isSubmitting,
                              handleChange,
                              ...field,
                            } as any)}
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
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    src={file ? URL.createObjectURL(file[0]) : DefaultProfile}
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
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="contained-button-file">
                    <InputFile
                      sx={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => {
                        setFile(e.target.files)

                        setFieldValue('avatar', e.target.files?.[0] as Blob)
                      }}
                      id="contained-button-file"
                      name="avatar"
                      type="file"
                    />
                    <Button
                      startIcon={<SaveOutlinedIcon />}
                      color="primary"
                      variant="contained"
                      disableElevation
                      component="span"
                      disabled={isSubmitting}
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
                  </label>
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
        message={responseMsg}
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
        message={responseMsg}
      />
    </Box>
  )
}

export default CreateUserManagement
