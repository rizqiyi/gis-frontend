import district from '@shp/district.zip'
import street from '@shp/street.zip'
import street_2 from '@shp/street_2.zip'
import river from '@shp/river.zip'
import bridge from '@shp/bridge.zip'
import village from '@shp/village.zip'

export interface IBasicMap {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  url: string | any
}

const BASIC_MAP: IBasicMap[] = [
  {
    title: 'Batas Desa',
    url: village,
  },
  {
    title: 'Batas Kecamatan',
    url: district,
  },
  {
    title: 'Jalan Kereta Api',
    url: street,
  },
  {
    title: 'Jembatan',
    url: bridge,
  },
  {
    title: 'Ruas Jalan',
    url: street_2,
  },
  {
    title: 'Sungai Begawan Solo',
    url: river,
  },
]

export default BASIC_MAP
