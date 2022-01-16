import React from 'react'
import {
  Drawer,
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material'
import DrawerOrnament from '@illust/drawer-ornament.svg'
import LogoBordered from '@images/logo.png'
import HomeIcon from '@icons/home-ic.svg'
import DrainaseIcon from '@icons/drainase-ic.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UserIcon from '@icons/user-ic.svg'
import ProfileSettingIcon from '@icons/settings-profile-ic.svg'
import LogoutIcon from '@icons/logout-ic.svg'
import truncate from '@helpers/truncate'
import { getCurrentUser } from '@helpers/jwt-decode'
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const currentUser = getCurrentUser()

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const matchPathname = (pathname: string): boolean =>
    location.pathname.split('/')[1] === pathname

  const isNotDynamicPage = !['detail', 'edit', 'delete', 'create'].includes(
    location.pathname.split('/')[2]
  )

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
            borderRight: 'none',
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
          {currentUser.role_name === 'Super Admin' && (
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
          )}
        </Box>
        <Box
          className={classes.logoutContainer}
          sx={{ borderTop: '2px solid #7ACFFF' }}
        >
          <Box sx={{ margin: '40px 32px 0 32px' }}>
            <Paper
              elevation={0}
              sx={{
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: (theme) => theme.palette.secondary.main,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${currentUser.avatar}`}
                      sx={{ width: 48, height: 48 }}
                    />
                  </Box>
                  <Box sx={{ ml: '12px', color: '#FFFFFF' }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {currentUser.fullname.split(' ')[0]}
                    </Typography>
                    <Tooltip title={currentUser.email}>
                      <Typography variant="caption">
                        {truncate(currentUser.email, 14, 10)}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ color: '#FFFFFF' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    flex: 1,
                  }}
                >
                  <Typography variant="caption">
                    {currentUser.role_name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '1.5px',
                    backgroundColor: '#26A1D8',
                    position: 'relative',
                    height: '24px',
                    bottom: 0,
                    left: currentUser.role_name === 'Admin' ? 0 : '12px',
                  }}
                />
                <Box
                  sx={{
                    color: 'white',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mr: '10px',
                  }}
                >
                  <Typography variant="caption">
                    Jalur {currentUser.manage}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: '#F4FBFF',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Box component="main" sx={{ margin: '56px 72px' }}>
          {isNotDynamicPage && <TitlePage />}
          {children}
        </Box>
      </Box>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          top: -70,
          left: 30,
          position: 'absolute',
        }}
        PaperProps={{
          sx: {
            boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.24)',
            mt: 1.5,
            border: '1px solid #DDDFE5',
          },
        }}
      >
        <MenuItem onClick={() => navigate('/settings')}>
          <img src={ProfileSettingIcon} alt="profile setting" />
          <Typography color="secondary" sx={{ ml: '12px' }}>
            Atur Profile Pengguna
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem('tokenAccess')

            localStorage.removeItem('userAccess')

            navigate('/')
          }}
        >
          <img src={LogoutIcon} alt="logout" />
          <Typography color="error" sx={{ ml: '12px' }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default PrivateDrawer
