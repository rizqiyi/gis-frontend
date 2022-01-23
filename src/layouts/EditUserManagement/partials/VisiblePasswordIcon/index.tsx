import React from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

interface IIVisiblePasswordIcon {
  visiblePassword: boolean
  setVisiblePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<IIVisiblePasswordIcon> = ({
  visiblePassword,
  setVisiblePassword,
}: IIVisiblePasswordIcon) =>
  visiblePassword ? (
    <RemoveRedEyeOutlinedIcon
      onClick={() => setVisiblePassword(false)}
      style={{
        width: '26px',
        height: '18px',
        cursor: 'pointer',
      }}
    />
  ) : (
    <VisibilityOffOutlinedIcon
      onClick={() => setVisiblePassword(true)}
      style={{
        width: '26px',
        height: '18px',
        cursor: 'pointer',
      }}
    />
  )

export default Index
