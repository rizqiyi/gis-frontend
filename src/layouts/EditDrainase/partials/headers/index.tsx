import React from 'react'
import { Box, Typography } from '@mui/material'

interface IHeaders {
  icon: string
  title: string
  borderTop?: boolean
  topSpace?: boolean
  YSpace?: boolean
}

const Index: React.FC<IHeaders> = ({
  icon,
  title,
  borderTop,
  topSpace,
  YSpace,
}: IHeaders): JSX.Element => {
  return (
    <Box
      sx={{
        padding: '24px 48px',
        borderBottom: '2px solid #EDEDED',
        margin: YSpace ? '48px 0' : 0,
        marginTop: topSpace ? '48px' : 0,
        borderTop: borderTop ? '2px solid #EDEDED' : 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <img src={icon} alt="marker" />
        </Box>
        <Typography sx={{ ml: '16px' }} variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

export default Index
