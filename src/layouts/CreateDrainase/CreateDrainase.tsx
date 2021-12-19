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
import Dropzone from '@components/Dropzone'
import { IDrainaseForm } from '@interfaces/drainase'
import { getAccessToken, getCurrentUser } from '@helpers/jwt-decode'
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

  return (
    <Box>
      <Formik
        initialValues={{
          street_name: '',
          district: '',
          sub_district: '',
          street_width: '',
          sta: '',
          latitude: '',
          longitude: '',
          left_typical: '',
          left_drainase_depth: '',
          left_drainase_width: '',
          left_drainase_condition: '',
          right_typical: '',
          right_drainase_depth: '',
          right_drainase_width: '',
          right_drainase_condition: '',
          note: '',
          user_id: getCurrentUser().id,
          description: '',
          is_published: true,
        }}
        enableReinitialize
        onSubmit={async (e: IDrainaseForm, { setSubmitting }) => {
          setSubmitting(true)

          const typical: { [key: number]: string } = {
            1: 'Trapesium',
            2: 'Bentuk U',
            3: 'Bronjong',
            4: 'Kotak/Tertutup',
          }

          const condition: { [key: number]: string } = {
            5: 'Baik',
            6: 'Rusak Ringan',
            7: 'Rusak Ringan',
            8: 'Rusak Berat',
          }

          const switchValues = (
            keys: string,
            values: IDrainaseForm
          ): string | Blob => {
            if (keys === 'left_drainase_condition')
              return condition[+values.left_drainase_condition]

            if (keys === 'right_drainase_condition')
              return condition[+values.right_drainase_condition]

            if (keys === 'right_typical') return typical[+values.right_typical]

            if (keys === 'left_typical') return typical[+values.left_typical]

            return values[keys as keyof IDrainaseForm] as string | Blob
          }

          const form = new FormData()

          Object.keys(e).map((data) => form.append(data, switchValues(data, e)))

          images.left_drainase.map((image: File) =>
            form.append('images', image)
          )

          images.right_drainase.map((image: File) =>
            form.append('images', image)
          )

          try {
            await api({
              method: 'post',
              url: '/drainase/create',
              data: form,
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': getAccessToken(),
              },
            })

            setSubmitting(false)
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            setSubmitting(false)
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
                        component={Input}
                        placeholder="Nama Ruas Jalan"
                        name="street_name"
                        id="street_name"
                        disabled={isSubmitting}
                        onChange={handleChange}
                        variant="filled"
                        sx={{ width: '88%' }}
                      />
                    </Box>
                  </Grid>
                  <Field
                    data={drainaseForm}
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
                    data={leftDrainase}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    values={values}
                  />
                </Grid>
                <Dropzone
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
                    data={rightDrainase}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    values={values}
                  />
                </Grid>
                <Dropzone
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
                        disabled={isSubmitting}
                        onChange={handleChange}
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
                        disabled={isSubmitting}
                        onChange={handleChange}
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
    </Box>
  )
}

export default CreateDrainase
