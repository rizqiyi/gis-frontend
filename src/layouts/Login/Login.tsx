import React, { useState } from 'react'
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { MailOutline } from '@mui/icons-material'
import Input from '@components/Input'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisiblePasswordIcon from './partials/VisibleIcon'
import useStyles from './Login.styles'
import MapsIllustration from '../../images/illustrations/Maps.svg'

const Login = (): JSX.Element => {
  const classes = useStyles()
  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Box className={classes.LeftContentWrapper}>
            <img className={classes.maps} alt="maps" src={MapsIllustration} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Box className={classes.RightContentWrapper}>
            <Box width="auto">
              <Box maxWidth={464}>
                <Typography
                  className={classes.greetingText}
                  fontWeight={600}
                  variant="h4"
                >
                  Selamat Datang Di Sistem Geografi{' '}
                  <span className={classes.separateText}>Bojonegoro</span>
                </Typography>
              </Box>
              <Box marginTop="24px" className={classes.disabledText}>
                <Typography variant="subtitle1">
                  Silahkan login sebagai admin
                </Typography>
              </Box>
            </Box>
            <Paper className={classes.paperContent} elevation={0}>
              <Box>
                <Input
                  placeholder="Email"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <MailOutline style={{ width: '26px', height: '18px' }} />
                    ),
                  }}
                  variant="filled"
                  fullWidth
                />
              </Box>
              <Box marginTop="40px">
                <Input
                  type={visiblePassword ? 'text' : 'password'}
                  placeholder="Password"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <LockOutlinedIcon
                        style={{ width: '26px', height: '18px' }}
                      />
                    ),
                    endAdornment: (
                      <VisiblePasswordIcon
                        visiblePassword={visiblePassword}
                        setVisiblePassword={setVisiblePassword}
                      />
                    ),
                  }}
                  variant="filled"
                  fullWidth
                />
              </Box>
              <Box marginTop="20px">
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked />}
                  label={
                    <Box
                      className={`${classes.disabledText} ${classes.textCenter}`}
                      fontWeight={400}
                    >
                      <Typography variant="caption">Ingat Saya</Typography>
                    </Box>
                  }
                />
              </Box>
              <Box marginTop="20px">
                <Button
                  fullWidth
                  className={classes.button}
                  disableElevation
                  variant="contained"
                  color="primary"
                  style={{ textTransform: 'inherit' }}
                >
                  <Typography variant="button">Login</Typography>
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
