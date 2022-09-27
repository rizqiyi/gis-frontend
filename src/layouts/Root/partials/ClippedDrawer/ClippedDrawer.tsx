import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '@images/logo.png'
import HomeIcon from '@icons/home-blue-ic.svg'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '@/helpers/jwt-decode'
import DefaultProfile from '@illust/profile-default.svg'
import { Menu, MenuItem, Tooltip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LogoutIcon from '@icons/logout-ic.svg'
import CardInfoDrawer from '../CardInfoDrawer'
import CardListDrainase from '../CardListDrainase'
import useStyles from './ClippedDrawer.styles'

const drawerWidth = 420

interface IPosition {
  lat: number | string
  lng: number | string
}

interface IClippedDrawer {
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
  setPath: React.Dispatch<React.SetStateAction<string>>
  path: string
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
const ClippedDrawer: React.FC<IClippedDrawer> = ({
  children,
  setPosition,
  setPath,
  path,
}: IClippedDrawer): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.08)',
        }}
      >
        <Toolbar
          style={{
            paddingLeft: '30px',
            paddingRight: '30px',
            paddingTop: '14px',
            paddingBottom: '14px',
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <img src={logo} width="50px" height="50px" alt="bojonegoro" />
            <Typography className={classes.title} fontWeight={700} variant="h6">
              WebGIS Prasarana Jalan
            </Typography>
          </Box>
          <Box>
            {user ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
                onClick={(e) => handleClick(e)}
              >
                <Box display="flex" alignItems="center" marginRight="17px">
                  <img
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '16px',
                    }}
                    width="48px"
                    height="48px"
                    onError={({ currentTarget }) => {
                      // eslint-disable-next-line no-return-assign, no-param-reassign
                      return (currentTarget.src = DefaultProfile)
                    }}
                    src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${user.avatar}`}
                    alt="avatar"
                  />
                  <Box sx={{ lineHeight: 0 }}>
                    <Tooltip title={user.fullname}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {`${user.fullname}`.split(' ')[0]}
                      </Typography>
                    </Tooltip>
                    <Typography variant="caption" sx={{ color: '#9E9E9E' }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
                <KeyboardArrowDownIcon />
              </Box>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className={classes.loginButton}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          // eslint-disable-next-line no-useless-computed-key
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 0,
            boxShadow: '12px 0px 24px rgba(112, 144, 176, 0.06)',
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: 'hidden',
            paddingTop: '48px',
            paddingLeft: '30px',
            paddingRight: '30px',
            height: '38%',
          }}
        >
          <CardInfoDrawer />
        </Box>
        <CardListDrainase
          path={path}
          setPath={setPath}
          setPosition={setPosition}
        />
      </Drawer>
      <Box component="main" sx={{ width: '100%' }}>
        <Toolbar sx={{ marginTop: '9px' }} />
        {children}
      </Box>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.24)',
            mt: 1.5,
            border: '1px solid #DDDFE5',
          },
        }}
      >
        <MenuItem onClick={() => navigate('/dashboard')}>
          <img src={HomeIcon} alt="profile setting" />
          <Typography color="secondary" sx={{ ml: '12px' }}>
            Pergi ke dashboard
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem('tokenAccess')

            localStorage.removeItem('userAccess')
          }}
        >
          <img src={LogoutIcon} alt="logout" style={{ marginLeft: '3px' }} />
          <Typography color="error" sx={{ ml: '12px' }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ClippedDrawer
