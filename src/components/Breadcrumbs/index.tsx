import React from 'react'
import { Typography, Box, Breadcrumbs, Link, Skeleton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import SeparatorIc from '@icons/separator-ic.svg'
import useStyles from './Breadcrumbs.styles'

interface IBreadcrumbs {
  additionalActionText?: string
  additionalDetailText?: string
  loading?: boolean
}

const index: React.FC<IBreadcrumbs> = ({
  additionalActionText = '',
  additionalDetailText = '',
  loading = false,
}: IBreadcrumbs): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const classes = useStyles()

  const pathname: string[] = location.pathname.split('/')

  const title: { [key: string]: string } = {
    dashboard: 'Dashboard',
    drainase: 'Drainase Management',
    'user-management': 'User Management',
    settings: 'Pengaturan Profile Pengguna',
  }

  const actionText: { [key: string]: string } = {
    create: 'Buat',
    edit: 'Edit',
    detail: 'Detail',
    profile: 'Ubah Profile',
    password: 'Ubah Password',
  }

  return (
    <Box sx={{ marginBottom: '46px' }}>
      <Typography variant="h4" fontWeight={600}>
        {title[pathname[1]]}
      </Typography>
      <Box sx={{ marginTop: '8px', color: '#1FA9E7' }}>
        <Breadcrumbs
          separator={<img src={SeparatorIc} alt="separator" />}
          aria-label="breadcrumb"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            className={
              additionalDetailText && pathname[2]
                ? classes.menuText
                : classes.activeText
            }
            onClick={() => navigate(`/${pathname[1]}`)}
            underline="none"
          >
            <Typography
              sx={{ color: '#1FA9E7' }}
              key="2"
              className={
                additionalDetailText || pathname[2]
                  ? classes.menuText
                  : classes.activeText
              }
              variant="body1"
              fontWeight={500}
            >
              {title[pathname[1]] as string}
            </Typography>
          </Link>
          {pathname[2] && (
            <Typography
              sx={{ color: '#1FA9E7' }}
              key="2"
              className={
                additionalDetailText ? classes.menuText : classes.activeText
              }
              variant="body1"
              fontWeight={500}
            >
              {actionText[pathname[2]]} {additionalActionText}
            </Typography>
          )}
          {loading && <Skeleton width={250} variant="text" />}
          {!loading && additionalDetailText && (
            <Typography
              sx={{ color: '#1FA9E7' }}
              key="3"
              className={classes.activeText}
              variant="body1"
              fontWeight={500}
            >
              {additionalDetailText}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>
    </Box>
  )
}

export default index
