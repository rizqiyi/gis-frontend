import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import L from 'leaflet'
import Marker from '@icons/marker.svg'

const realMarker = renderToStaticMarkup(
  <img width="45px" height="45px" src={Marker} alt="marker" />
)

// eslint-disable-next-line new-cap, @typescript-eslint/no-explicit-any
const factory = new (L as any).divIcon({
  className: '',
  iconAnchor: [12, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [10, -20],
  iconSize: [45, 45],
  html: realMarker,
})

export default factory
