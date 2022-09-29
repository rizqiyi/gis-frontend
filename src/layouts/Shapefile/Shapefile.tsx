import React from 'react'
import { Paper, Grid, Box, Typography, Button } from '@mui/material'

const Shapefile = (): JSX.Element => {
  return (
    <>
      <Grid container spacing={4}>
        {[
          'Batas Desa',
          'Batas Kecamatan',
          'Jalan Kereta Api',
          'Jembatan',
          'Ruas Jalan',
          'Sungai Begawan Solo',
        ].map((data) => (
          <Grid key={data} item lg={6} xl={4}>
            <Paper elevation={0} sx={{ borderRadius: '12px' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="24px"
              >
                <Typography fontWeight={600} variant="body2">
                  {data}
                </Typography>
                <Button
                  sx={{
                    padding: '12px 18px',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: ' 0px 8px 20px rgba(31, 169, 231, 0.12)',
                  }}
                  variant="contained"
                  disableElevation
                >
                  <Typography fontWeight={600} fontSize={14}>
                    Upload File
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ height: '2px', backgroundColor: '#EDEDED' }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="24px"
              >
                <Typography color="#9E9E9E" fontWeight={600} variant="body2">
                  file .zip
                </Typography>
                <Typography fontWeight={600} fontSize={14}>
                  -
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Shapefile
