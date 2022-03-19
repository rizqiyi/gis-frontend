/* eslint-disable @typescript-eslint/indent */
import React, { useCallback, useRef, useState } from 'react'
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
  const [page, setPage] = useState(1)
  const { drainase, loading, setDrainase } = useDrainase(
    true,
    [path, page],
    {
      street_path: path,
      page,
    },
    false,
    true
  )

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (path !== newAlignment) {
      setPage(1)

      setDrainase({
        current_page: 1,
        data: [],
        limit: 5,
        next_page: null,
        offset: 0,
        per_page: 5,
        previous_page: null,
        total: 0,
      })
    }

    setPath(newAlignment)
  }

  const observer = useRef<IntersectionObserver | null>()

  const hasMore = drainase?.next_page !== null

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

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
        padding={loading && page === 1 ? '0 20px 0 30px' : 'inherit'}
        overflow="auto"
        className={classes.scrollStyle}
      >
        {loading && page === 1
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
                  ref={
                    drainase.data?.length === idx + 1 ? lastElementRef : null
                  }
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
        {loading &&
          page > 1 &&
          Array(5)
            .fill('')
            .map((_, idx: number) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                marginTop={idx === 0 ? '24px' : 0}
                marginRight="10px"
                padding="0 20px 0 30px"
              >
                <Skeleton
                  variant="rectangular"
                  height="70px"
                  sx={{
                    marginTop: idx === 0 ? 0 : '24px',
                    marginBottom: idx === 9 ? '24px' : 0,
                  }}
                />
              </Box>
            ))}
      </Box>
    </Box>
  )
}

export default CardListDrainase
