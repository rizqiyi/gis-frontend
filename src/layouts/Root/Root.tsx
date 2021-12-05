import React from 'react'
// import 'leaflet/dist/leaflet.css'
import { Box } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ClippedDrawer from './partials/ClippedDrawer'

const Root = (): JSX.Element => {
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
            <Marker position={[-7.149394463836124, 111.88015171886103]}>
              <Popup>Nopal asu</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </ClippedDrawer>
    </Box>
  )
}

export default Root
