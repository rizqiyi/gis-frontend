/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import {
  ToggleButton,
  Box,
  ListItemButton,
  ToggleButtonGroup,
  Typography,
  Skeleton,
} from '@mui/material'
import Water from '@icons/maki_water.svg'
import WaterActive from '@icons/maki_water_active.svg'
import { useDrainase } from '@services/hooks/dashboard'
import { IDrainaseData } from '@interfaces/drainase'
import useStyles from './CardListDrainase.styles'

interface IPosition {
  lat: number | string
  lng: number | string
}

interface ICardListDrainase {
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
  setPath: React.Dispatch<React.SetStateAction<string>>
  path: string
}

const CardListDrainase: React.FC<ICardListDrainase> = ({
  setPosition,
  setPath,
  path,
}: ICardListDrainase): JSX.Element => {
  const classes = useStyles()
  const [active, setActive] = useState(Object)
  const { drainase, loading } = useDrainase(true, [path], { street_path: path })

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setPath(newAlignment)
  }

  return (
    <Box>
      {!loading && (
        <Box
          sx={{
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontWeight={600} className={classes.title}>
                Daftar Drainase
              </Typography>
            </Box>
            <Box>
              <ToggleButtonGroup
                size="small"
                color="primary"
                exclusive
                onChange={handleChange}
                value={path}
              >
                <ToggleButton value="A" sx={{ borderRadius: '12px' }}>
                  Jalur A
                </ToggleButton>
                <ToggleButton value="B" sx={{ borderRadius: '12px' }}>
                  Jalur B
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        marginRight="10px"
        marginTop="27px"
        height="41.5vh"
        padding={loading ? '0 20px 0 30px' : 'inherit'}
        overflow="auto"
        className={classes.scrollStyle}
      >
        {loading
          ? Array(5)
              .fill('')
              .map((_, idx: number) => (
                <Skeleton
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  variant="rectangular"
                  height="70px"
                  sx={{
                    marginTop: idx === 0 ? 0 : '24px',
                    marginBottom: idx === 9 ? '24px' : 0,
                  }}
                />
              ))
          : drainase?.data?.map(
              (
                {
                  district,
                  street_name,
                  street_width: width,
                  latitude,
                  longitude,
                }: IDrainaseData,
                idx
              ) => (
                <ListItemButton
                  component="a"
                  sx={{
                    marginTop: idx === 0 ? 0 : '24px',
                    marginBottom: idx === 9 ? '24px' : 0,
                  }}
                  selected={active[idx]}
                  onClick={() => {
                    setActive({ [idx]: !active[idx] })

                    setPosition({ lat: latitude, lng: longitude })
                  }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${longitude}_${idx}`}
                >
                  <Box display="flex" paddingLeft="14px">
                    <Box>
                      <img
                        src={active[idx] ? WaterActive : Water}
                        width="11.19px"
                        height="16px"
                        alt="water"
                      />
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Typography
                        fontWeight={600}
                        className={classes.roadDescription}
                        sx={{ marginLeft: '18px' }}
                      >
                        {street_name}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        className={classes.roadDescription}
                        sx={{ marginTop: '6px', marginLeft: '18px' }}
                      >
                        Lebar jalan {width} meter
                      </Typography>
                      <Typography
                        fontWeight={500}
                        className={classes.placeText}
                        sx={{ marginTop: '6px', marginLeft: '18px' }}
                      >
                        {district}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              )
            )}
      </Box>
    </Box>
  )
}

export default CardListDrainase
