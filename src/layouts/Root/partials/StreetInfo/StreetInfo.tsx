import React from 'react'
import { Box, Typography } from '@mui/material'

interface IStreetInfo {
  data: {
    latitude: number
    longitude: number
    district: string
    sub_district: string
    street_name: string
    width: number
    sta: string
    left_drainase?: {
      typical: string
      drainase_depth: number
      drainase_width: number
      drainase_condition: string
    }
    right_drainase?: {
      typical: string
      drainase_depth: number
      drainase_width: number
      drainase_condition: string
    }
    note: string
    description: string
  }
}

const StreetInfo: React.FC<IStreetInfo> = ({
  data,
}: IStreetInfo): JSX.Element => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          bottom: '3px',
          backdropFilter: 'blur(16px)',
          width: '100%',
          height: '70px',
          background: 'rgba(131, 216, 255, 0.32)',
          padding: '12px 24px',
          color: '#FFFFFF',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1" fontWeight={500}>
              {data.street_name}
            </Typography>
            <Typography variant="caption" fontWeight={300}>
              {data.district}, {data.sub_district}.
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ textAlign: 'right', fontSize: '10px' }}
          >
            <Typography variant="caption" fontWeight={400}>
              Lebar Jalan{' '}
              <span style={{ fontWeight: 600 }}>{data.width} Meter</span>
            </Typography>
            <Typography variant="caption" fontWeight={300}>
              {data.sta} Meter <span style={{ fontWeight: 400 }}> STA.</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StreetInfo
