import React from 'react'
import { Drawer, Box, Typography } from '@mui/material'
import DrawerOrnament from '@illust/drawer-ornament.svg'
import LogoBordered from '@images/logo.png'
import HomeIcon from '@icons/home-ic.svg'
import DrainaseIcon from '@icons/drainase-ic.svg'
import UserIcon from '@icons/user-ic.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import useStyles from './PrivateDrawer.styles'
import TitlePage from '../TitlePage'

const drawerWidth = 300

interface IPrivateDrawer {
  children: React.ReactNode
}

const PrivateDrawer: React.FC<IPrivateDrawer> = ({
  children,
}: IPrivateDrawer): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const matchPathname = (pathname: string): boolean =>
    location.pathname.split('/')[1] === pathname

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(180deg, #62C1FA 0%, #1FA9E7 100%)',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
      >
        <Box position="relative">
          <img
            style={{
              position: 'absolute',
              top: 32,
              width: '100%',
              height: 'auto',
            }}
            src={DrawerOrnament}
            alt="wave"
          />
        </Box>
        <Box className={classes.contentWrapper}>
          <Box className={classes.borderedImage}>
            <img
              width="46px"
              height="46px"
              src={LogoBordered}
              alt="bojonegoro bordered"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            color="#FFFFFF"
            marginLeft="12px"
          >
            <Typography variant="subtitle1" fontWeight={600}>
              WebGIS Drainase
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              Bojonegoro
            </Typography>
          </Box>
        </Box>
        <Box className={classes.menuContainer}>
          <Box
            onClick={() => navigate('/dashboard')}
            className={`${classes.cardMenu} ${
              matchPathname('dashboard') ? classes.cardMenuActive : ''
            }`}
          >
            <img src={HomeIcon} width="20px" height="20px" alt="home" />
            <Box sx={{ marginLeft: '13px', color: '#ffffff' }}>
              <Typography variant="subtitle1">Dashboard</Typography>
            </Box>
          </Box>
          <Box
            onClick={() => navigate('/drainase')}
            sx={{ marginTop: '24px' }}
            className={`${classes.cardMenu} ${
              matchPathname('drainase') ? classes.cardMenuActive : ''
            }`}
          >
            <img src={DrainaseIcon} width="20px" height="20px" alt="home" />
            <Box sx={{ marginLeft: '13px', color: '#ffffff' }}>
              <Typography variant="subtitle1">Drainase</Typography>
            </Box>
          </Box>
          <Box
            onClick={() => navigate('/user-management')}
            sx={{ marginTop: '24px' }}
            className={`${classes.cardMenu} ${
              matchPathname('user-management') ? classes.cardMenuActive : ''
            }`}
          >
            <img src={UserIcon} width="20px" height="20px" alt="home" />
            <Box sx={{ marginLeft: '13px', color: '#ffffff' }}>
              <Typography variant="subtitle1">Manage User</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ width: '100%', margin: '56px 72px' }}>
        <TitlePage />
        {children}
      </Box>
    </Box>
  )
}

export default PrivateDrawer
