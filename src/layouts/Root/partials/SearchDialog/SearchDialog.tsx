/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
  Box,
  DialogProps,
  ListItemButton,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Formik, Form } from 'formik'
import Water from '@icons/maki_water.svg'
import WaterActive from '@icons/maki_water_active.svg'
import DrainaseEmpty from '@illust/drainase-empty.svg'
import Input from '@/components/Input'
import { IDrainaseData } from '@/interfaces/drainase'
import useStyles from './SearchDialog.styles'
import useDrainaseSearch from './searchQuery'

interface IPosition {
  lat: number | string
  lng: number | string
}

interface ISearchDialog extends DialogProps {
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
  handleClose: () => void
}

const SeachDialog: React.FC<ISearchDialog> = ({
  setPosition,
  handleClose,
  ...rest
}: ISearchDialog): JSX.Element => {
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:600px)')
  const [search, setSearch] = useState<string>('')
  const [path, setPath] = useState<string>('A')
  const [active, setActive] = useState<{ [key: string]: boolean }>({})

  const { data: drainase, isLoading } = useDrainaseSearch({
    q: search,
    path,
    options: {
      enabled: search !== '',
    },
  })

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setPath(newAlignment)
  }

  return (
    <Dialog
      {...rest}
      scroll="paper"
      aria-labelledby="search-dialog-title"
      aria-describedby="search-dialog-description"
      onClose={() => {
        handleClose()

        setActive({})
      }}
      fullWidth
    >
      <DialogTitle id="search-dialog-title">
        <Formik
          initialValues={{ search: '' }}
          // eslint-disable-next-line no-console
          onSubmit={(e) => console.log(e)}
        >
          {() => (
            <Form>
              <Input
                placeholder="Cari Ruas Jalan, Kecamatan Kabupaten"
                InputProps={{
                  disableUnderline: true,
                  ...(matches
                    ? {}
                    : {
                        endAdornment: (
                          <ToggleButtonGroup
                            size="small"
                            color="primary"
                            sx={{
                              height: '40px',
                              width: '200px',
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                            exclusive
                            onChange={handleChange}
                            value={path}
                          >
                            <ToggleButton
                              value="A"
                              sx={{ borderRadius: '12px' }}
                            >
                              Jalur A
                            </ToggleButton>
                            <ToggleButton
                              value="B"
                              sx={{ borderRadius: '12px' }}
                            >
                              Jalur B
                            </ToggleButton>
                          </ToggleButtonGroup>
                        ),
                      }),
                }}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                id="search"
                variant="filled"
                fullWidth
                required
              />
              {matches && (
                <ToggleButtonGroup
                  size="small"
                  color="primary"
                  sx={{ marginTop: '15px' }}
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
              )}
            </Form>
          )}
        </Formik>
      </DialogTitle>
      <DialogContent
        dividers={(drainase?.data || [])?.length !== 0}
        className={classes.scrollStyle}
      >
        {!isLoading && (drainase?.data || [])?.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // height: '10vh',
              flexDirection: 'column',
            }}
          >
            <img
              src={DrainaseEmpty}
              width="240px"
              height="240px"
              alt="drainase-empty"
            />
            <Box sx={{ marginTop: '15px' }}>
              <Typography variant="body1" fontWeight={600}>
                Belum ada data yang ditampilkan
              </Typography>
            </Box>
            <Box sx={{ marginTop: '10px', color: '#9E9E9E' }}>
              <Typography variant="body2">
                Coba kata kunci pencarian lainnya
              </Typography>
            </Box>
          </Box>
        )}
        {isLoading
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
                idx: number
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
      </DialogContent>
    </Dialog>
  )
}

export default SeachDialog
