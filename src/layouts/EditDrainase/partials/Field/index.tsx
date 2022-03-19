/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { FastField } from 'formik'
import Input from '@components/Input'
import Select from '@components/Select'
import { IDrainaseForm } from '@interfaces/drainase'

interface IOptions {
  label: string
  value: string | number
}

interface IForm {
  label: string
  name: string
  placeholder: string
  type?: string
  required?: boolean
  options?: IOptions[]
}

interface IIndex {
  data: IForm[]
  handleChange?: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  values?: IDrainaseForm
  isSubmitting?: boolean
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
}

const Index: React.FC<IIndex> = ({
  data,
  handleChange,
  isSubmitting,
  values,
  setFieldValue,
}: IIndex): JSX.Element => {
  const typical: { [key: string]: string } = {
    Trapesium: '1',
    'Bentuk U': '2',
    Bronjong: '3',
    'Kotak/Tertutup': '4',
    'Tidak Ada': '5',
  }

  const condition: { [key: string]: string } = {
    Baik: '5',
    'Rusak Ringan': '6',
    'Rusak Sedang': '7',
    'Rusak Berat': '8',
    'Tidak Ada': '9',
  }

  const typicalNum: { [key: number]: string } = {
    1: 'Trapesium',
    2: 'Bentuk U',
    3: 'Bronjong',
    4: 'Kotak/Tertutup',
    5: 'Tidak Ada',
  }

  const conditionNum: { [key: number]: string } = {
    5: 'Baik',
    6: 'Rusak Ringan',
    7: 'Rusak Ringan',
    8: 'Rusak Berat',
    9: 'Tidak Ada',
  }

  return (
    <>
      {data.map((drainase: IForm) =>
        drainase.type === 'select' ? (
          <Grid key={drainase.name} item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box sx={{ width: '25%' }}>
                <Typography fontWeight={600} variant="subtitle2">
                  {drainase.label}
                </Typography>
              </Box>
              <Select
                label={drainase.placeholder}
                withErrorMsg={false}
                required={drainase.required}
                disabled={isSubmitting}
                value={
                  drainase.name.split('_')[1] === 'typical'
                    ? (typical[
                        (values?.[
                          drainase.name as keyof IDrainaseForm
                        ] as string) || 'Trapesium'
                      ] as string) || ''
                    : (condition[
                        (values?.[
                          drainase.name as keyof IDrainaseForm
                        ] as string) || 'Baik'
                      ] as string) || ''
                }
                id={drainase.name}
                onChange={(event) => {
                  setFieldValue(
                    drainase.name as string,
                    drainase.name.split('_')[1] === 'typical'
                      ? typicalNum[event.target.value as number]
                      : conditionNum[event.target.value as number]
                  )
                }}
                options={drainase.options}
                sx={{ width: '75%' }}
              />
            </Box>
          </Grid>
        ) : (
          <Grid key={drainase.name} item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box sx={{ width: '25%' }}>
                <Typography fontWeight={600} variant="subtitle2">
                  {drainase.label}
                </Typography>
              </Box>
              <FastField
                withErrorMsg={false}
                required={drainase.required}
                disabled={isSubmitting}
                component={Input}
                value={values?.[drainase.name as keyof IDrainaseForm] as string}
                placeholder={drainase.placeholder}
                name={drainase.name}
                id={drainase.name}
                onChange={handleChange}
                variant="filled"
                sx={{ width: '75%' }}
              />
            </Box>
          </Grid>
        )
      )}
    </>
  )
}

export default memo(Index)
