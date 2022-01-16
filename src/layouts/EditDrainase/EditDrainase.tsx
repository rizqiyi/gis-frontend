import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import Input from '@components/Input'
import {
  drainaseForm,
  leftDrainase,
  rightDrainase,
} from '@constant/form.drainase'
import MarkerIc from '@icons/marker-ic.svg'
import DrainaseIc from '@icons/drainase-ic-blue.svg'
import PublishIc from '@icons/publish-ic.svg'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DraftIc from '@icons/draft-ic.svg'
import { IDrainaseForm } from '@interfaces/drainase'
import { getAccessToken, getCurrentUser } from '@helpers/jwt-decode'
import { useParams } from 'react-router-dom'
import validation from '@validations/drainase'
import Breadcrumbs from '@components/Breadcrumbs'
import useDrainaseRead from '@/services/hooks/dashboard/useDrainaseRead'
import ServersideDropzone from '@/components/Dropzone/partials/Serverside'
import CSnackbar from '@/components/Snackbar'
import api from '@services/common'
import Field from './partials/Field'
import Headers from './partials/headers'
import useStyles from './CreateDrainase.styles'

const CreateDrainase = (): JSX.Element => {
  const classes = useStyles()
  const [images, setImages] = useState<{ [key: string]: File[] }>({
    left_drainase: [],
    right_drainase: [],
  })
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [updateStatus, setUpdateStatus] = useState<{ [key: string]: boolean }>({
    error: false,
    success: false,
  })

  const { id }: { [key: string]: string | undefined } = useParams()

  const { drainase, loading } = useDrainaseRead(false, id as string, [
    loadingDelete as boolean,
    loadingUpdate as boolean,
  ])

  return (
    <Box>
      <Breadcrumbs
        loading={loading}
        additionalDetailText={drainase.street_name}
      />
      <Formik
        initialValues={{
          street_name: drainase.street_name || '',
          district: drainase.district || '',
          sub_district: drainase.sub_district || '',
          street_width: drainase.street_width || '',
          sta: drainase.sta || '',
          latitude: drainase.latitude || '',
          longitude: drainase.longitude || '',
          left_typical: drainase.left_typical || '',
          left_drainase_depth: drainase.left_drainase_depth || '',
          left_drainase_width: drainase.left_drainase_width || '',
          left_drainase_condition: drainase.left_drainase_condition || '',
          right_typical: drainase.right_typical || '',
          right_drainase_depth: drainase.right_drainase_depth || '',
          right_drainase_width: drainase.right_drainase_width || '',
          right_drainase_condition: drainase.right_drainase_condition || '',
          note: drainase.note || '',
          user_id: getCurrentUser().id,
          description: drainase.description || '',
          is_published: drainase.is_published,
        }}
        validationSchema={validation}
        enableReinitialize
        onSubmit={async (e: IDrainaseForm, { setSubmitting }) => {
          setSubmitting(true)
          setLoadingUpdate(true)

          const switchValues = (
            keys: string,
            values: IDrainaseForm
          ): string | Blob =>
            values[keys as keyof IDrainaseForm] as string | Blob

          const form = new FormData()

          Object.keys(e).map((data) => form.append(data, switchValues(data, e)))

          images.left_drainase.map((image: File) =>
            form.append('left_drainase_images', image)
          )

          images.right_drainase.map((image: File) =>
            form.append('right_drainase_images', image)
          )

          try {
            await api({
              method: 'put',
              url: `/drainase/update/${id}`,
              data: form,
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': getAccessToken(),
              },
            })

            setSubmitting(false)
            setLoadingUpdate(false)
            setUpdateStatus({
              error: false,
              success: true,
            })
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            setSubmitting(false)
            setLoadingUpdate(false)
            setUpdateStatus({
              error: true,
              success: false,
            })
          }
        }}
      >
        {({ handleChange, values, setFieldValue, isSubmitting }) => (
          <Form>
            <Paper elevation={0} sx={{ p: 0 }}>
              <Headers icon={MarkerIc} title="Lokasi Drainase" />
              <Box
                sx={{
                  mt: '48px',
                  padding: '0 48px',
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box sx={{ width: '12%' }}>
                        <Typography fontWeight={600} variant="subtitle2">
                          Ruas Jalan
                        </Typography>
                      </Box>
                      <FastField
                        withErrorMsg={false}
                        required
                        component={Input}
                        placeholder="Nama Ruas Jalan"
                        name="street_name"
                        id="street_name"
                        value={values.street_name}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        variant="filled"
                        sx={{ width: '88%' }}
                      />
                    </Box>
                  </Grid>
                  <Field
                    setFieldValue={setFieldValue}
                    data={drainaseForm}
                    values={values}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                  />
                </Grid>
              </Box>
              <Headers
                topSpace
                borderTop
                icon={DrainaseIc}
                title="Drainase Kiri"
              />
              <Box
                sx={{
                  mt: '48px',
                  padding: '0 48px',
                }}
              >
                <Grid container spacing={4}>
                  <Field
                    setFieldValue={setFieldValue}
                    data={leftDrainase}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    values={values}
                  />
                </Grid>
                <ServersideDropzone
                  loadNewData={loading}
                  setLoadingDelete={setLoadingDelete}
                  loadingDelete={loadingDelete}
                  imagesFromServer={drainase.left_images_drainase}
                  isSubmitting={isSubmitting}
                  name="left_drainase"
                  setImages={setImages}
                  images={images?.left_drainase}
                />
              </Box>
              <Headers
                topSpace
                borderTop
                icon={DrainaseIc}
                title="Drainase Kanan"
              />
              <Box
                sx={{
                  mt: '48px',
                  padding: '0 48px',
                }}
              >
                <Grid container spacing={4}>
                  <Field
                    setFieldValue={setFieldValue}
                    data={rightDrainase}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    values={values}
                  />
                </Grid>
                <ServersideDropzone
                  loadNewData={loading}
                  setLoadingDelete={setLoadingDelete}
                  loadingDelete={loadingDelete}
                  imagesFromServer={drainase.right_images_drainase}
                  isSubmitting={isSubmitting}
                  name="right_drainase"
                  setImages={setImages}
                  images={images?.right_drainase}
                />
              </Box>
              <Headers topSpace borderTop icon={DrainaseIc} title="Lainnya" />
              <Box
                sx={{
                  mt: '48px',
                  padding: '0 48px',
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box sx={{ width: '15%' }}>
                        <Typography fontWeight={600} variant="subtitle2">
                          Catatan
                        </Typography>
                      </Box>
                      <FastField
                        component={Input}
                        placeholder="Catatan drainase"
                        name="note"
                        id="note"
                        required
                        withErrorMsg={false}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        value={values.note}
                        variant="filled"
                        rows={2}
                        multiline
                        sx={{ width: '85%' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box sx={{ width: '15%', mt: '40px' }}>
                        <Typography fontWeight={600} variant="subtitle2">
                          Keterangan
                        </Typography>
                      </Box>
                      <FastField
                        component={Input}
                        placeholder="Masukkan keterangan"
                        name="description"
                        id="description"
                        required
                        withErrorMsg={false}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        value={values.description}
                        variant="filled"
                        rows={2}
                        multiline
                        sx={{ width: '85%' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    width: '100%',
                  }}
                >
                  <Box sx={{ width: '15%', mt: '40px' }}>
                    <Typography fontWeight={600} variant="subtitle2">
                      Status
                    </Typography>
                  </Box>
                  <Box sx={{ width: '85%' }}>
                    <Button
                      sx={{
                        minHeight: '54px',
                        padding: '0 24px',
                        borderRadius: '12px',
                      }}
                      disabled={isSubmitting}
                      onClick={() => setFieldValue('is_published', true)}
                      className={
                        values.is_published
                          ? classes.activeButton
                          : classes.inactiveButton
                      }
                      startIcon={
                        <img
                          src={values.is_published ? PublishIc : DraftIc}
                          width={24}
                          height={24}
                          alt="publish"
                        />
                      }
                    >
                      <Typography
                        sx={{ ml: '14px' }}
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        Tampil
                      </Typography>
                    </Button>
                    <Button
                      sx={{
                        minHeight: '54px',
                        padding: '0 24px',
                        borderRadius: '12px',
                        ml: '32px',
                      }}
                      disabled={isSubmitting}
                      className={
                        values.is_published
                          ? classes.inactiveButton
                          : classes.activeButton
                      }
                      onClick={() => setFieldValue('is_published', false)}
                      startIcon={
                        <img
                          src={values.is_published ? DraftIc : PublishIc}
                          width={24}
                          height={24}
                          alt="draft"
                        />
                      }
                    >
                      <Typography
                        sx={{ ml: '14px' }}
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        Draft
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: '48px',
                  borderTop: '2px solid #EDEDED',
                  padding: '24px 48px',
                }}
              >
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
                    Simpan Drainase
                  </Typography>
                </Button>
              </Box>
            </Paper>
          </Form>
        )}
      </Formik>
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
        message="Berhasil memperbarui drainase"
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
        message="Gagal memperbarui drainase"
      />
    </Box>
  )
}

export default CreateDrainase
