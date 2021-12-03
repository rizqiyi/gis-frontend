import React from 'react'
import Input from '@components/Input'
import { MailOutline } from '@mui/icons-material'

const Login = (): JSX.Element => {
  return (
    <div>
      <Input
        placeholder="Username"
        id="reddit-input"
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: <MailOutline />,
        }}
      />
    </div>
  )
}

export default Login
