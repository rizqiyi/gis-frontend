import React, { useState } from 'react'
import { Box, ListItemButton, Typography } from '@mui/material'
import Water from '@icons/maki_water.svg'
import WaterActive from '@icons/maki_water_active.svg'
import useStyles from './CardListDrainase.styles'
import dataset from '../../constant'
// eslint-disable-next-line import/no-cycle
import { IPosition } from '../../Root'

interface ICardListDrainase {
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
}

const CardListDrainase: React.FC<ICardListDrainase> = ({
  setPosition,
}: ICardListDrainase): JSX.Element => {
  const classes = useStyles()
  const [active, setActive] = useState(Object)

  return (
    <Box>
      <Box
        sx={{
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        <Typography fontWeight={600} className={classes.title}>
          Daftar Drainase
        </Typography>
      </Box>
      <Box
        marginRight="10px"
        marginTop="27px"
        height="41.5vh"
        overflow="auto"
        className={classes.scrollStyle}
      >
        {dataset.map(
          ({ district, street_name, width, latitude, longitude }, idx) => (
            <ListItemButton
              component="a"
              href="#simple-list"
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
              key={idx}
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
