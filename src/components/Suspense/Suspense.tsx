import React, { memo } from 'react'
import { Box, Grow, LinearProgress, Typography } from '@mui/material'
import LogoBordered from '@images/logo.png'
import BojonegoroMap from '@illust/bojonegoro-map.svg'
import useStyles from './Suspense.styles'

const Suspense = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grow timeout={400} in>
      <Box className={classes.container}>
        <img width="100%" height="528px" src={BojonegoroMap} alt="bojonegoro" />
        <Box className={classes.centeredContent}>
          <Box className={classes.borderedImage}>
            <img
              width="56px"
              height="56px"
              src={LogoBordered}
              alt="bojonegoro bordered"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            color="#404040"
            marginLeft="24px"
          >
            <Typography variant="h5" fontWeight={600}>
            WebGIS Prasarana Jalan
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              Bojonegoro
            </Typography>
            <Box className={classes.loadingWrapper}>
              <LinearProgress
                variant="indeterminate"
                className={classes.loading}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grow>
  )
}

export default memo(Suspense)
