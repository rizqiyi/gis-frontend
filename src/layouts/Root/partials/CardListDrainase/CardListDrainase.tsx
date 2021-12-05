import React, { useState } from 'react'
import { Box, ListItemButton, Typography } from '@mui/material'
import Water from '@icons/maki_water.svg'
import WaterActive from '@icons/maki_water_active.svg'
import useStyles from './CardListDrainase.styles'

const CardListDrainase = (): JSX.Element => {
  const classes = useStyles()
  const [active, setActive] = useState(Object)

  const dummy = {
    street: 'Jl. Raya Puk Sumberrejo',
    desc: 'Lebar jalan 8 meter. 1 meter STA.',
    district: 'Bojonegoro, Sumberrejo.',
  }

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
        {Array.from({ length: 10 }, () => dummy).map(
          ({ street, desc, district }, idx) => (
            <ListItemButton
              component="a"
              href="#simple-list"
              sx={{
                marginTop: idx === 0 ? 0 : '24px',
                marginBottom: idx === 9 ? '24px' : 0,
              }}
              selected={active[idx]}
              onClick={() => setActive({ [idx]: !active[idx] })}
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
                    {street}
                  </Typography>
                  <Typography
                    fontWeight={600}
                    className={classes.roadDescription}
                    sx={{ marginTop: '6px', marginLeft: '18px' }}
                  >
                    {desc}
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
