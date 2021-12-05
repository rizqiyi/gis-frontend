import React from 'react'
import { Box, Typography } from '@mui/material'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Sample from '@images/sample.png'
import Slider from 'react-slick'
import sliderConfig from '@helpers/react-slick/config'
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
      // hidden={value !== index}
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

const Root = (): JSX.Element => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <ClippedDrawer>
        <Box>
          <MapContainer
            center={[-7.149394463836124, 111.88015171886103]}
            zoom={20}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/rizqiyi/ckwsae4xm850314o2904zuayz/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`}
            />
            <Marker
              icon={CustomMarker}
              position={[-7.149394463836124, 111.88015171886103]}
            >
              <CustomPopup
                position={[-7.149394463836124, 111.88015171886103]}
                closeButton={false}
              >
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
                    {Array(5)
                      .fill('')
                      .map((_, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={idx}>
                          <img src={Sample} alt="sample" />
                        </Box>
                      ))}
                  </Slider>
                  <StreetInfo />
                  <DetailStreet />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Slider className={classes.slider} {...sliderConfig}>
                    {Array(5)
                      .fill('')
                      .map((_, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={idx}>
                          <img src={Sample} alt="sample" />
                        </Box>
                      ))}
                  </Slider>
                  <StreetInfo />
                  <DetailStreet />
                </TabPanel>
              </CustomPopup>
            </Marker>
          </MapContainer>
        </Box>
      </ClippedDrawer>
    </Box>
  )
}

export default Root
