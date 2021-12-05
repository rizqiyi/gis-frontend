import { Popup } from 'react-leaflet'
import { styled } from '@mui/system'

const CustomPopup = styled(Popup)({
  // eslint-disable-next-line no-useless-computed-key
  ['.leaflet-popup-content-wrapper']: {
    borderRadius: '12px',
    width: 'fit-content',
    height: '100%',
    padding: 0,
    boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.16)',
  },
  // eslint-disable-next-line no-useless-computed-key
  ['.leaflet-popup-content']: {
    width: 'auto !important',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  // eslint-disable-next-line no-useless-computed-key
  ['.leaflet-popup']: {
    width: 'fit-content',
    height: '100%',
  },
})

export default CustomPopup
