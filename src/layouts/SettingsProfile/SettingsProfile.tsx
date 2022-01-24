/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Box, Button, Paper, Typography, styled } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { getAccessToken, getCurrentUser } from '@/helpers/jwt-decode'
import DefaultProfile from '@illust/profile-default.svg'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { FastField, Form, Formik } from 'formik'
import Input from '@/components/Input'
import Select from '@/components/Select'
import axios from 'axios'
import CSnackbar from '@/components/Snackbar'
import validation from '@/validations/users'
import fields, { IUserForm } from './constant'

const InputFile = styled('input')({
  display: 'none',
})

const SettingsProfile = (): JSX.Element => {
  const user = getCurrentUser()
  const [updateStatus, setUpdateStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [file, setFile] = useState<FileList | null>(null)

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
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            manage: user.manage,
            avatar: '',
          }}
          validationSchema={validation}
          onSubmit={async (v, { setSubmitting, resetForm }) => {
            const form = new FormData()

            Object.keys(v).map((data: string) =>
              form.append(data, v[data as keyof IUserForm] as string | Blob)
            )

            if (v.avatar === '') form.delete('avatar')

            try {
              const res = await axios.put(
                `${process.env.REACT_APP_API_URI_PROD}/users/update/me`,
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
          {({ setFieldValue, isSubmitting, handleChange, values }) => (
            <Form>
              <Box padding="48px">
                <Box
                  width="25%"
                  marginBottom="40px"
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
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    height="170px"
                    onError={({ currentTarget }) => {
                      // eslint-disable-next-line no-return-assign, no-param-reassign
                      return (currentTarget.src = DefaultProfile)
                    }}
                    src={
                      file
                        ? URL.createObjectURL(file[0])
                        : `${process.env.REACT_APP_API_URI_IMAGEKIT}${user?.avatar}`
                    }
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
                    <Box sx={{ width: '85%' }}>
                      {switchField({
                        isSubmitting,
                        handleChange,
                        values,
                        ...field,
                      } as any)}
                    </Box>
                  </Box>
                ))}
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
        message={responseMsg}
      />
    </Box>
  )
}

export default SettingsProfile
