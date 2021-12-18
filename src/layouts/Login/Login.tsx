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
import { PersonOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import Input from '@components/Input'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import validationLogin from '@validations/auth'
import MapsIllustration from '@illust/Maps.svg'
import api from '@services/common'
import { ILogin } from '@interfaces/user'
import VisiblePasswordIcon from './partials/VisibleIcon'
import useStyles from './Login.styles'

const Login = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: ILogin, { setSubmitting }: any) => {
    setSubmitting(true)

    try {
      const response = await api({
        method: 'post',
        url: '/users/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
      })

      localStorage.setItem('tokenAccess', response.token)
      localStorage.setItem('userAccess', JSON.stringify(response.data))

      navigate('/dashboard')

      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
    }
  }

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
                <Typography fontWeight={600} variant="h4">
                  Selamat Datang Di Sistem Geografi{' '}
                  <span className={classes.separateText}>Bojonegoro</span>
                </Typography>
              </Box>
              <Box marginTop="24px" className={classes.disabledText}>
                <Typography variant="subtitle1">
                  Silahkan login sebagai admin
                </Typography>
              </Box>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={validationLogin}
                onSubmit={handleSubmit}
              >
                {({ handleChange, isSubmitting }) => (
                  <Form>
                    <Paper className={classes.paperContent} elevation={0}>
                      <Box>
                        <Input
                          placeholder="Username"
                          InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                              <PersonOutline
                                style={{ width: '26px', height: '18px' }}
                              />
                            ),
                          }}
                          name="username"
                          id="username"
                          onChange={handleChange}
                          variant="filled"
                          fullWidth
                          required
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
                          id="password"
                          name="password"
                          onChange={handleChange}
                          variant="filled"
                          fullWidth
                          required
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
                              <Typography variant="caption">
                                Ingat Saya
                              </Typography>
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
                          type="submit"
                          color="primary"
                          style={{ textTransform: 'inherit' }}
                          disabled={isSubmitting}
                        >
                          <Typography variant="button">Login</Typography>
                        </Button>
                      </Box>
                    </Paper>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
