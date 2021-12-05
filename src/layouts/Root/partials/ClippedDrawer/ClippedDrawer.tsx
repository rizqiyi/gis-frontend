import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '@images/logo.png'
import { useNavigate } from 'react-router-dom'
import CardInfoDrawer from '../CardInfoDrawer'
import CardListDrainase from '../CardListDrainase'
import useStyles from './ClippedDrawer.styles'

const drawerWidth = 460

interface IPosition {
  lat: number
  lng: number
}

interface IClippedDrawer {
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
const ClippedDrawer: React.FC<IClippedDrawer> = ({
  children,
  setPosition,
}: IClippedDrawer): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

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
              WebGIS Drainase Bojonegoro
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => navigate('/login')}
              className={classes.loginButton}
            >
              Login
            </Button>
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
        <CardListDrainase setPosition={setPosition} />
      </Drawer>
      <Box component="main" sx={{ width: '100%' }}>
        <Toolbar sx={{ marginTop: '9px' }} />
        {children}
      </Box>
    </Box>
  )
}

export default ClippedDrawer
