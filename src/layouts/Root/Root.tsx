/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Box, Fade, Typography } from '@mui/material'
import { MapContainer, TileLayer, Marker, MapConsumer } from 'react-leaflet'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import dataset from '@constant/dataset'
import { useDrainase } from '@services/hooks/dashboard'
import Slider from 'react-slick'
import sliderConfig from '@helpers/react-slick/config'
import SearchIcon from '@icons/search-ic.svg'
import { IDrainaseImages } from '@interfaces/drainase'
import useStyles from './Root.styles'
import ClippedDrawer from './partials/ClippedDrawer'
import CustomMarker from './partials/CustomMarker'
import CustomPopup from './partials/CustomPopup'
import StreetInfo from './partials/StreetInfo'
import DetailStreet from './partials/DetailStreet'
import SeachDialog from './partials/SearchDialog'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%', display: 'block' }}>{children}</Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

interface IPosition {
  lat: any
  lng: any
}

const Root = (): JSX.Element => {
  const classes = useStyles()
  const [value, setValue] = useState<number>(0)
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false)
  const [path, setPath] = useState<string>('A')
  const { drainase, loading } = useDrainase(true, [path], { street_path: path })
  const [position, setPosition] = useState<IPosition>({
    lat: drainase?.data?.[0]?.latitude || dataset[0].latitude,
    lng: drainase?.data?.[0]?.longitude || dataset[0].longitude,
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValue(newValue)
  }

  return (
    <Box>
      <ClippedDrawer path={path} setPath={setPath} setPosition={setPosition}>
        <Box>
          <MapContainer center={[position.lat, position.lng]} zoom={30}>
            <Box position="relative" left="38px" top="38px" zIndex={999}>
              <Box position="absolute">
                <Box
                  sx={{
                    width: '48px',
                    borderRadius: '12px',
                    height: '48px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '48px',
                    padding: '5px 0',
                    cursor: 'pointer',
                    boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.16)',
                    backgroundColor: '#FFF',
                    color: 'black',
                    rotate: 'revert',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                  onClick={() => setOpenSearchModal(true)}
                >
                  <img src={SearchIcon} alt="search" />
                </Box>
              </Box>
            </Box>
            <Fade in={loading}>
              <Box position="relative" left="0" top="0" zIndex={10000}>
                <Box
                  position="absolute"
                  width="100%"
                  sx={{ backgroundColor: '#FAFAFA', opacity: '0.5' }}
                  height="100vh"
                />
              </Box>
            </Fade>
            <MapConsumer>
              {(map) => {
                map.setView(position, map.getZoom())

                map.zoomControl.setPosition('bottomright')

                return null
              }}
            </MapConsumer>
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/rizqiyi/ckwsae4xm850314o2904zuayz/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`}
            />
            {!loading &&
              drainase?.data?.map((data, idx) => (
                <Marker
                  position={[data.latitude, data.longitude]}
                  icon={CustomMarker}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${data.district}_${idx}`}
                  eventHandlers={{
                    click: () =>
                      setPosition({ lat: data.latitude, lng: data.longitude }),
                  }}
                >
                  <CustomPopup autoPan={false} closeButton={false}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      sx={{
                        width: '100%',
                        padding: '17px 24px 0 24px',
                      }}
                      centered
                      textColor="primary"
                      indicatorColor="primary"
                    >
                      <Tab
                        label={
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontWeight={600}
                          >
                            Drainase Kiri
                          </Typography>
                        }
                        {...a11yProps(0)}
                      />
                      <Tab
                        label={
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontWeight={600}
                          >
                            Drainase Kanan
                          </Typography>
                        }
                        {...a11yProps(1)}
                      />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <Slider className={classes.slider} {...sliderConfig}>
                        {data.left_images_drainase.map(
                          ({ image_path, image_name }: IDrainaseImages) => (
                            <Box key={image_name}>
                              <img
                                width="392px"
                                style={{ objectFit: 'cover' }}
                                height="250px"
                                src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${image_path}`}
                                alt={image_name}
                              />
                            </Box>
                          )
                        )}
                      </Slider>
                      <StreetInfo data={data} />
                      <DetailStreet
                        data={{
                          typical: data.left_typical,
                          drainase_depth: data.left_drainase_depth,
                          drainase_width: data.left_drainase_width,
                          drainase_condition: data.left_drainase_condition,
                        }}
                        note={data.note}
                      />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Slider className={classes.slider} {...sliderConfig}>
                        {data.right_images_drainase.map(
                          ({ image_path, image_name }: IDrainaseImages) => (
                            <Box key={image_name}>
                              <img
                                width="392px"
                                style={{ objectFit: 'cover' }}
                                height="250px"
                                src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${image_path}`}
                                alt={image_name}
                              />
                            </Box>
                          )
                        )}
                      </Slider>
                      <StreetInfo data={data} />
                      <DetailStreet
                        data={{
                          typical: data.right_typical,
                          drainase_depth: data.right_drainase_depth,
                          drainase_width: data.right_drainase_width,
                          drainase_condition: data.right_drainase_condition,
                        }}
                        note={data.note}
                      />
                    </TabPanel>
                  </CustomPopup>
                </Marker>
              ))}
          </MapContainer>
        </Box>
      </ClippedDrawer>
      <SeachDialog
        setPosition={setPosition}
        open={openSearchModal}
        handleClose={() => setOpenSearchModal(false)}
      />
    </Box>
  )
}

export default Root
