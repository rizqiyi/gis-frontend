import React from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import DrainaseEmpty from '@illust/drainase-empty.svg'
import UserEmpty from '@illust/user-empty.svg'

const RenderEmpty = (): JSX.Element => {
  const location = useLocation()

  const pathname = location.pathname.split('/')

  const subtitle: { [key: string]: string } = {
    drainase: 'Silahkan buat data drainase terlebih dahulu',
    'user-management': 'Silahkan buat data user terlebih dahulu',
  }

  const image: { [key: string]: string } = {
    drainase: DrainaseEmpty,
    'user-management': UserEmpty,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45vh',
        flexDirection: 'column',
      }}
    >
      <img
        src={image[pathname[1]]}
        width="240px"
        height="240px"
        alt="drainase-empty"
      />
      <Box sx={{ marginTop: '15px' }}>
        <Typography variant="body1" fontWeight={600}>
          Belum ada data yang ditampilkan
        </Typography>
      </Box>
      <Box sx={{ marginTop: '10px', color: '#9E9E9E' }}>
        <Typography variant="body2">{subtitle[pathname[1]]}</Typography>
      </Box>
    </Box>
  )
}

export default RenderEmpty
