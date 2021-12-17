import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { MapContainer, TileLayer, Marker, MapConsumer } from 'react-leaflet'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import dataset from '@constant/dataset'
// import Sample from '@images/sample.png'
import useDrainase from '@services/hooks/dashboard'
import Slider from 'react-slick'
import sliderConfig from '@helpers/react-slick/config'
import { IDrainaseImages } from '@interfaces/drainase'
import useStyles from './Root.styles'
import ClippedDrawer from './partials/ClippedDrawer'
import CustomMarker from './partials/CustomMarker'
import CustomPopup from './partials/CustomPopup'
import StreetInfo from './partials/StreetInfo'
import DetailStreet from './partials/DetailStreet'

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
  lat: number
  lng: number
}

const Root = (): JSX.Element => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const { drainase } = useDrainase()
  const [position, setPosition] = useState<IPosition>({
    lat: dataset[0].latitude,
    lng: dataset[0].longitude,
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValue(newValue)
  }

  return (
    <Box>
      <ClippedDrawer setPosition={setPosition}>
        <Box>
          <MapContainer center={[position.lat, position.lng]} zoom={30}>
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
            {drainase?.data?.map((data) => (
              <Marker
                position={[data.latitude, data.longitude]}
                icon={CustomMarker}
                key={data.district}
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
                      {data.images.map(
                        ({ image_path, image_name }: IDrainaseImages) => (
                          <Box key={image_name}>
                            <img
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
                      {data.images.map(
                        ({ image_path, image_name }: IDrainaseImages) => (
                          <Box key={image_name}>
                            <img
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
    </Box>
  )
}

export default Root
