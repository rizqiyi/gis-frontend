/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useUsersRead } from '@/services/hooks/users'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Paper, Typography, styled, Skeleton } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { Form, Formik } from 'formik'
import Input from '@/components/Input'
import Select from '@/components/Select'
import InfoIcon from '@icons/info-ic.svg'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DefaultProfile from '@illust/profile-default.svg'
import axios from 'axios'
import CSnackbar from '@/components/Snackbar'
import { getAccessToken } from '@/helpers/jwt-decode'
import FormDialog from '@/components/Dialog'
import VisiblePasswordIcon from './partials/VisiblePasswordIcon'
import fields, { IUserForm } from './constant'

const InputFile = styled('input')({
  display: 'none',
})

const EditUserManagement = (): JSX.Element => {
  const { id }: { [key: string]: string | undefined } = useParams()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [file, setFile] = useState<FileList | null>(null)
  const navigate = useNavigate()
  const [updateStatus, setUpdateStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })
  const [open, setOpen] = useState<boolean>(false)
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const { users, loading } = useUsersRead(id as string, [loadingUpdate])
  const [responseMsg, setResponseMsg] = useState<string>('')

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
      <Breadcrumbs loading={loading} additionalDetailText={users?.fullname} />
      <Paper elevation={0} sx={{ p: '48px' }}>
        <Formik
          enableReinitialize
          initialValues={{
            fullname: users?.fullname || '',
            email: users?.email || '',
            manage: users?.manage || '',
            role_name: users?.role_name || '',
            password: '',
            avatar: '',
          }}
          // eslint-disable-next-line no-console
          onSubmit={async (v, { setSubmitting, resetForm }) => {
            setLoadingUpdate(true)
            const form = new FormData()

            Object.keys(v).map((data: string) =>
              form.append(data, v[data as keyof IUserForm] as string | Blob)
            )

            if (v.avatar === '') form.delete('avatar')
            if (v.password === '') form.delete('password')

            try {
              const res = await axios.put(
                `${process.env.REACT_APP_API_URI_PROD}/users/update/${id}`,
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

              setLoadingUpdate(false)
            } catch (err: any) {
              setResponseMsg(err.response.data.message)

              setUpdateStatus({
                error: true,
                success: false,
              })

              setSubmitting(false)

              setLoadingUpdate(false)
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
                  {loading ? (
                    <Skeleton variant="circular" width={170} height={170} />
                  ) : (
                    <img
                      width="170px"
                      style={{ borderRadius: '50%' }}
                      height="170px"
                      onError={({ currentTarget }) => {
                        // eslint-disable-next-line no-return-assign, no-param-reassign
                        return (currentTarget.src = DefaultProfile)
                      }}
                      src={
                        file
                          ? URL.createObjectURL(file[0])
                          : `${process.env.REACT_APP_API_URI_IMAGEKIT}${users?.avatar}`
                      }
                      alt="default"
                    />
                  )}
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
                      disabled={loading || isSubmitting}
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
                  disabled={loading || isSubmitting}
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
                <Button
                  startIcon={<DeleteOutlinedIcon />}
                  color="error"
                  variant="contained"
                  disabled={loading || isSubmitting}
                  disableElevation
                  onClick={() => setOpen(true)}
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
      <FormDialog
        title="Anda yakin ingin menghapus data User ?"
        desc="Data yang telah dihapus tidak dapat kembali"
        titleSuccess="Berhasil menghapus data User"
        descSuccess="data telah terhapus, silahkan kembali ke list"
        successBtnText="Kembali ke list"
        handleSuccess={() => navigate('/user-management')}
        open={open}
        okText="Hapus"
        cancelText="Cancel"
        onSuccessAction={deleteStatus.success}
        disabled={loadingDelete}
        handleClose={(_, reason: string | undefined) => {
          if (
            (loadingDelete || deleteStatus.success) &&
            reason &&
            reason === 'backdropClick'
          )
            return

          setOpen(false)
        }}
        handleOk={async () => {
          setLoadingDelete(true)

          try {
            const res = await axios.delete(
              `${process.env.REACT_APP_API_URI_PROD}/users/delete/${id}`,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'x-auth-token': getAccessToken(),
                },
              }
            )

            setResponseMsg(res.data.message)

            setLoadingDelete(false)

            setDeleteStatus({ success: true, error: false })
          } catch (err: any) {
            setResponseMsg(err.response.data.message)

            setLoadingDelete(false)

            setDeleteStatus({ success: false, error: true })
          }
        }}
      />
    </Box>
  )
}

export default EditUserManagement
