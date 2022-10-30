import React, { memo, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import Leaflet from 'leaflet'
import shp from 'shpjs'
import { useMapContext } from './partials/context'

const Index: React.FC = () => {
  const map = useMap()
  const { basicMap } = useMapContext()

  useEffect(() => {
    const geo = Leaflet.geoJSON(
      { type: 'Feature' },
      {
        onEachFeature: function popUp(f, l) {
          const out: string[] = []

          if (f.properties) {
            // eslint-disable-next-line guard-for-in, no-restricted-syntax
            for (const key in f.properties) {
              out.push(`${key}: ${f.properties[key]}`)
            }
            l.bindPopup(out.join('<br />'))
          }
        },
      }
    ).addTo(map)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shp(`${window.location.origin}${basicMap}`).then((data: any) => {
      geo.addData(data)
    })

    return () => {
      map.removeLayer(geo)
    }
  }, [basicMap])

  return null
}

export default memo(Index)
