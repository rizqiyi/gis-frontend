/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Skeleton, Tooltip, Typography } from '@mui/material'
import DrainaseIc from '@icons/drainase-ic-blue.svg'
import truncate from '@/helpers/truncate'

interface IDetailHeader {
  drainase: any
  loading: boolean
}

const DetailHeader: React.FC<IDetailHeader> = ({
  drainase,
  loading,
}: IDetailHeader): JSX.Element => {
  return (
    <Box padding="32px 40px">
      {loading ? (
        <Skeleton
          sx={{ borderRadius: '12px' }}
          variant="rectangular"
          width="48px"
          height="48px"
        />
      ) : (
        <Box
          sx={{
            width: '48px',
            height: '48px',
            backgroundColor: '#D8F2FF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
          }}
        >
          <img src={DrainaseIc} alt="marker" />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
        gap="12px"
      >
        <Box>
          {loading ? (
            <Skeleton sx={{ marginTop: '24px' }} width={100} variant="text" />
          ) : (
            <Box marginTop="24px" color="#9E9E9E">
              <Typography variant="subtitle2">Nama Jalan</Typography>
            </Box>
          )}
          {loading ? (
            <Skeleton sx={{ marginTop: '12px' }} width={200} variant="text" />
          ) : (
            <Box marginTop="12px">
              <Tooltip title={`${drainase?.street_name}`}>
                <Typography fontWeight={600} variant="h6">
                  {truncate(`${drainase?.street_name}`, 19, 10)}
                </Typography>
              </Tooltip>
            </Box>
          )}
        </Box>
        {loading ? (
          <Skeleton
            sx={{
              borderRadius: '8px',
              padding: '0 16px',
              width: '48px',
              height: '38px',
            }}
            variant="rectangular"
          />
        ) : (
          <Box
            sx={{
              width: '48px',
              height: '38px',
              padding: '0 16px',
              backgroundColor: drainase?.is_published ? '#33C863' : '#FAFAFA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: drainase?.is_published ? '#FFFFFF' : '#404040',
              borderRadius: '8px',
            }}
          >
            <Typography variant="subtitle2">
              {drainase?.is_published ? 'Tampil' : 'Draft'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DetailHeader
