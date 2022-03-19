import React from 'react'
import { Paper, Box, Typography, Skeleton } from '@mui/material'
import WaterSplashIllustration from '@illust/WaterSplash.svg'
import useDrainaseDashboard from '@/services/hooks/dashboard/useDrainaseDashboard'
import useStyles from './CardInfoDrawer.styles'

const CardInfoDrawer = (): JSX.Element => {
  const classes = useStyles()
  const { drainase: data, loading } = useDrainaseDashboard()

  if (loading) return <Skeleton variant="rectangular" height="200px" />

  return (
    <Paper
      sx={{
        background: 'linear-gradient(180deg, #27B3F2 0%, #1FA9E7 100%)',
        boxShadow: '0px 12px 24px rgba(31, 169, 231, 0.24)',
        padding: '20px 24px',
        position: 'relative',
        zIndex: 3,
      }}
      className={classes.paperStyles}
    >
      <Box zIndex={2}>
        <Box>
          <Typography
            fontWeight={700}
            className={classes.textCount}
            variant="h3"
          >
            {data?.total}
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight={700} className={classes.textSum} variant="h6">
            Total Drainase
          </Typography>
        </Box>
        <Box display="flex" marginTop="20px" gap="24px">
          <Box flex={1}>
            <Paper
              elevation={0}
              sx={{
                background: 'linear-gradient(180deg, #1B99D1 0%, #1290C8 100%)',
                borderRadius: '8px',
                height: '32px',
                padding: '4px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                fontWeight={500}
                className={classes.drainaseText}
                variant="subtitle1"
              >
                Drainase Kiri
              </Typography>
              <Typography
                fontWeight={700}
                className={classes.textSum}
                variant="h6"
              >
                {data?.total || 0}
              </Typography>
            </Paper>
          </Box>
          <Box flex={1}>
            <Paper
              elevation={0}
              sx={{
                background: 'linear-gradient(180deg, #1B99D1 0%, #1290C8 100%)',
                borderRadius: '8px',
                height: '32px',
                padding: '4px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                fontWeight={500}
                className={classes.drainaseText}
                variant="subtitle1"
              >
                Drainase Kanan
              </Typography>
              <Typography
                fontWeight={700}
                className={classes.textSum}
                variant="h6"
              >
                {data?.total || 0}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
      <img
        src={WaterSplashIllustration}
        className={classes.waterSplash}
        alt="WaterSplash"
      />
    </Paper>
  )
}

export default CardInfoDrawer
