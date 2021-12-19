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
}

const Index: React.FC<IIndex> = ({
  data,
  handleChange,
  isSubmitting,
  values,
}: IIndex): JSX.Element => {
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
                disabled={isSubmitting}
                value={values?.[drainase.name as keyof IDrainaseForm] as string}
                id={drainase.name}
                onChange={handleChange}
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
                disabled={isSubmitting}
                component={Input}
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
