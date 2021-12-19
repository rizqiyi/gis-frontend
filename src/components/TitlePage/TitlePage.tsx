import React from 'react'
import { Box, Typography } from '@mui/material'
// import SeparatorIc from '@icons/separator-ic.svg'
import { useLocation } from 'react-router-dom'

const TitlePage = (): JSX.Element => {
  const location = useLocation()

  const pathname = location.pathname.split('/')

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

  //   <Typography
  //   sx={{ color: '#616161' }}
  //   key="2"
  //   variant="body1"
  //   fontWeight={500}
  // >
  //   test
  //   {/* {subtitle[pathname]} */}
  // </Typography>,

  return (
    <Box sx={{ marginBottom: '46px' }}>
      <Typography variant="h4" fontWeight={600}>
        {title[pathname[1]]}
      </Typography>
      <Box sx={{ marginTop: '8px', color: '#1FA9E7' }}>
        {/* <Breadcrumbs
          separator={<img src={SeparatorIc} alt="separator" />}
          aria-label="breadcrumb"
        >
          {breadcrumbContent}
        </Breadcrumbs> */}
        <Typography
          sx={{ color: '#1FA9E7' }}
          key="1"
          variant="body1"
          fontWeight={500}
        >
          {subtitle[pathname[1]]}
        </Typography>
      </Box>
    </Box>
  )
}

export default TitlePage
