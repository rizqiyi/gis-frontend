import React from 'react'
import { Grid, Box } from '@mui/material'

const Login = (): JSX.Element => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid style={{ background: '#EDF9FF', height: '100vh' }} item xs={5}>
          b
        </Grid>
        <Grid item xs={7}>
          a
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
