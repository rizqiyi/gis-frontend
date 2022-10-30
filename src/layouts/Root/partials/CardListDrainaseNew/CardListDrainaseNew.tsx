/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import { Box, Skeleton, Checkbox, FormControlLabel, Radio } from '@mui/material'
import Accordion from '@components/Accordion'
import BASIC_MAP, { IBasicMap } from '@/constant/basic-map'
import useDistrict from '@/services/hooks/dashboard/useDistrict'
import useStyles from './CardListDrainaseNew.styles'
import { useMapContext } from '../context'

const CardListDrainase: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const { district: districtA, loading: loadingDistrictA } = useDistrict(
    [],
    'A'
  )
  const { district: districtB, loading: loadingDistrictB } = useDistrict(
    [],
    'B'
  )
  const {
    basicMap,
    setBasicMap,
    setFilterDrainase,
    filterDrainase,
  } = useMapContext()
  const [districtQuery, setDistrictQuery] = useState<string>('')

  console.log(filterDrainase)

  return (
    <Box
      sx={{ padding: '0 30px' }}
      height="50vh"
      overflow="auto"
      className={classes.scrollStyle}
    >
      {loadingDistrictA || loadingDistrictB ? (
        <Skeleton />
      ) : (
        <Accordion title="Peta Dasar">
          {BASIC_MAP.map(({ title, url }: IBasicMap) => (
            <FormControlLabel
              key={title}
              label={title}
              control={
                <Radio
                  value={url}
                  checked={basicMap === url}
                  onChange={(e) => setBasicMap(e.target.value)}
                />
              }
            />
          ))}
        </Accordion>
      )}
      {loadingDistrictB ? (
        <Skeleton />
      ) : (
        <Accordion title="Data Saluran Drainase Jalur 1">
          {districtB?.data.length === 0
            ? 'Tidak ada data'
            : districtB?.data?.map(({ street_name }) => (
                <FormControlLabel
                  key={street_name}
                  label={street_name}
                  control={
                    <Checkbox
                      value={street_name}
                      checked={
                        filterDrainase.findIndex(
                          (drainase: string) => drainase === street_name
                        ) > -1
                      }
                      onChange={(e) => setFilterDrainase(e.target.value)}
                    />
                  }
                />
              ))}
        </Accordion>
      )}
      {loadingDistrictA ? (
        <Skeleton />
      ) : (
        <Accordion title="Data Saluran Drainase Jalur 2">
          {districtA?.data.length === 0
            ? 'Tidak ada data'
            : districtA?.data?.map(({ street_name }) => (
                <FormControlLabel
                  key={street_name}
                  label={street_name}
                  control={
                    <Checkbox
                      value={street_name}
                      checked={
                        filterDrainase.findIndex(
                          (drainase: string) => drainase === street_name
                        ) > -1
                      }
                      onChange={(e) => setFilterDrainase(e.target.value)}
                    />
                  }
                />
              ))}
        </Accordion>
      )}
    </Box>
  )
}

export default CardListDrainase
