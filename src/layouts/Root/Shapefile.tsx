import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import Leaflet from 'leaflet'
import shp from 'shpjs'

interface IShapeFile {
  zipUrl: string
}

const Index: React.FC<IShapeFile> = ({ zipUrl }: IShapeFile) => {
  const map = useMap()

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
    shp(`http://localhost:3000${zipUrl}`).then((data: any) => {
      geo.addData(data)
    })
  }, [])

  return null
}

export default Index
