import React from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const TitlePage = (): JSX.Element => {
  const location = useLocation()

  const pathname = location.pathname.split('/')[1]

  const title: { [key: string]: string } = {
    dashboard: 'Dashboard',
    drainase: 'Drainase Management',
    'user-management': 'User Management',
    settings: 'Pengaturan Profile Pengguna',
  }

  const subtitle: { [key: string]: string } = {
    dashboard: 'Overview',
    drainase: 'Drainase Management',
    'user-management': 'User Management',
    settings: 'Atur Profile Pengguna',
  }

  return (
    <Box sx={{ marginBottom: '46px' }}>
      <Typography variant="h4" fontWeight={600}>
        {title[pathname]}
      </Typography>
      <Box sx={{ marginTop: '8px', color: '#1FA9E7' }}>
        <Typography variant="body1" fontWeight={500}>
          {subtitle[pathname]}
        </Typography>
      </Box>
    </Box>
  )
}

export default TitlePage
