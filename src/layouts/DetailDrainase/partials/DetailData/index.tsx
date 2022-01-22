/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import formatCompleteDate from '@/helpers/moment/formatDate'

interface IDetailData {
  drainase: any
  loading: boolean
}

const DetailData: React.FC<IDetailData> = ({
  drainase,
  loading,
}: IDetailData): JSX.Element => {
  return (
    <Box>
      <Box padding="0 40px 32px 40px">
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Tanggal Dibuat</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {formatCompleteDate(drainase.createdAt as string)}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Kabupaten</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.district}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Kecamatan</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.sub_district}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Lebar Jalan (m)</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.street_width}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">STA (m)</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.sta}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Latitude</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.latitude}
              </Typography>
            </Box>
          </Box>
        )}
        {loading ? (
          <Skeleton variant="text" sx={{ marginTop: '30px' }} />
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="30px"
          >
            <Box color="#9E9E9E">
              <Typography variant="subtitle2">Longitude</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle2">
                {drainase?.longitude}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DetailData
