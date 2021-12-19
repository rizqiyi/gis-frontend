import React from 'react'
import { Box, Typography } from '@mui/material'
import { IDrainaseData } from '@interfaces/drainase'

interface IStreetInfo {
  data: IDrainaseData
}

const StreetInfo: React.FC<IStreetInfo> = ({
  data: { street_name, district, sub_district, street_width: width, sta },
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
              {street_name}
            </Typography>
            <Typography variant="caption" fontWeight={300}>
              {district}, {sub_district}.
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ textAlign: 'right', fontSize: '10px' }}
          >
            <Typography variant="caption" fontWeight={400}>
              Lebar Jalan <span style={{ fontWeight: 600 }}>{width} Meter</span>
            </Typography>
            <Typography variant="caption" fontWeight={300}>
              {sta} Meter <span style={{ fontWeight: 400 }}> STA.</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StreetInfo
