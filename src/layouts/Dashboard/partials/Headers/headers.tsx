import React from 'react'
import { Box, Grid, Typography, Skeleton } from '@mui/material'
import WaterSplash from '@illust/WaterSplashV2.svg'
import useDrainaseDashboard from '@/services/hooks/dashboard/useDrainaseDashboard'
import Typical from '@illust/typical.svg'
import { dynamicData } from '../../constant'

const Headers = (): JSX.Element => {
  const { drainase: data, loading } = useDrainaseDashboard()

  const title: { [key: string]: string } = {
    typicalTrapesium: 'Trapesium',
    typicalShapeU: 'Bentuk U',
    typicalRect: 'Kotak/Tertutup',
    typicalBronjong: 'Bronjong',
    goodCondition: 'Baik',
    lightBroken: 'Rusak Ringan',
    mediumBroken: 'Rusak Sedang',
    heavyBroken: 'Rusak Berat',
  }

  return (
    <Box display="flex" gap="40px">
      <Box width="65%">
        {loading ? (
          <Skeleton
            variant="rectangular"
            height="250px"
            sx={{ borderRadius: '12px' }}
          />
        ) : (
          <Box
            sx={{
              background: 'linear-gradient(180deg, #79D3FC 0%, #1FA9E7 100%)',
              boxShadow: '0px 12px 24px rgba(31, 169, 231, 0.12)',
            }}
            borderRadius="12px"
            height="250px"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            position="relative"
          >
            <Box
              padding="44px 64px"
              display="flex"
              flexDirection="column"
              zIndex={2}
              position="absolute"
              color="white"
            >
              <Typography variant="h1" fontWeight={700}>
                {data?.total}
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                Total Drainase
              </Typography>
            </Box>
            <Box position="absolute" zIndex={1} right={0}>
              <img width="450px" height="250px" src={WaterSplash} alt="water" />
            </Box>
          </Box>
        )}
        <Box display="flex" marginTop="40px" gap="40px" width="100%">
          {loading ? (
            <Skeleton
              variant="rectangular"
              height="180px"
              width="50%"
              sx={{ borderRadius: '12px' }}
            />
          ) : (
            <Box
              width="50%"
              sx={{
                backgroundColor: '#FFF',
                boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              }}
              padding="55px 45px"
              borderRadius="12px"
              display="flex"
              alignItems="center"
            >
              <img src={Typical} width="70px" height="70px" alt="drainase" />
              <Box marginLeft="32px">
                <Typography
                  sx={{ color: '#404040' }}
                  variant="h3"
                  fontWeight={700}
                >
                  {data?.total || 0}
                </Typography>
                <Typography
                  sx={{ color: '#9E9E9E' }}
                  variant="subtitle2"
                  fontWeight={700}
                >
                  Drainase Kiri
                </Typography>
              </Box>
            </Box>
          )}
          {loading ? (
            <Skeleton
              variant="rectangular"
              height="180px"
              width="50%"
              sx={{ borderRadius: '12px' }}
            />
          ) : (
            <Box
              width="50%"
              sx={{
                backgroundColor: '#FFF',
                boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              }}
              padding="55px 45px"
              borderRadius="12px"
              display="flex"
              alignItems="center"
            >
              <img src={Typical} width="70px" height="70px" alt="drainase" />
              <Box marginLeft="32px">
                <Typography
                  sx={{ color: '#404040' }}
                  variant="h3"
                  fontWeight={700}
                >
                  {data?.total || 0}
                </Typography>
                <Typography
                  sx={{ color: '#9E9E9E' }}
                  variant="subtitle2"
                  fontWeight={700}
                >
                  Drainase Kanan
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box width="35%" gap="40px">
        <Grid container spacing="40px">
          {Object.values(dynamicData).map((v: string) =>
            loading ? (
              <Grid key={v} item xs={6}>
                <Skeleton
                  variant="rectangular"
                  height="88px"
                  sx={{ borderRadius: '12px' }}
                />
              </Grid>
            ) : (
              <Grid key={v} item xs={6}>
                <Box
                  sx={{
                    backgroundColor: '#FFF',
                    boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
                  }}
                  borderRadius="12px"
                  display="flex"
                  flexDirection="column"
                  padding="19.5px 24px"
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#404040' }}
                    fontWeight={700}
                  >
                    {data[v]}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#9E9E9E' }}
                    fontWeight={700}
                  >
                    {title[v]}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default Headers
