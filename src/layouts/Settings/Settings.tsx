import React from 'react'
import DefaultProfile from '@illust/profile-default.svg'
import AccountSettings from '@illust/account-settings.svg'
import PasswordSettings from '@illust/password-settings.svg'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material'
import { getCurrentUser } from '@/helpers/jwt-decode'
import { useNavigate } from 'react-router-dom'

const Settings = (): JSX.Element => {
  const user = getCurrentUser()
  const matches = useMediaQuery('(max-width:900px)')
  const navigate = useNavigate()

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
          border: '1px solid #DDDFE5',
          borderRadius: '12px',
        }}
      >
        <Box
          padding="48px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img
            width="136px"
            height="136px"
            onError={({ currentTarget }) => {
              // eslint-disable-next-line no-return-assign, no-param-reassign
              return (currentTarget.src = DefaultProfile)
            }}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${user.avatar}`}
            alt="avatar"
          />
          <Typography sx={{ mt: '24px' }} variant="h6" fontWeight={600}>
            {user.fullname}
          </Typography>
          <Typography sx={{ mt: '8px', color: '#9E9E9E' }} variant="body2">
            {user.email}
          </Typography>
        </Box>
        <Box borderBottom="1px solid #DDDFE5" />
        <Box
          padding="48px"
          sx={{
            backgroundColor: '#FAFAFA',
            borderRadius: '0 0 12px 12px',
            flexWrap: matches ? 'wrap' : 'nowrap',
          }}
          display="flex"
          gap="40px"
        >
          <Paper
            elevation={0}
            sx={{
              boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              width: '100%',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Box display="flex" alignItems="center">
              <img src={AccountSettings} alt="akun" />
              <Box marginLeft="24px">
                <Typography variant="subtitle1" fontWeight={600}>
                  Ubah Profile
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: '#9E9E9E' }}
                >
                  Ubah data nama dan email profile anda
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                startIcon={<EditIcon />}
                color="primary"
                variant="contained"
                disableElevation
                sx={{
                  color: 'white',
                  minHeight: '44px',
                  borderRadius: '12px',
                }}
                onClick={() => navigate('/settings/profile')}
              >
                <Typography sx={{ ml: '10px' }} variant="subtitle2">
                  Edit
                </Typography>
              </Button>
            </Box>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              width: '100%',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Box display="flex" alignItems="center">
              <img src={PasswordSettings} alt="akun" />
              <Box marginLeft="24px">
                <Typography variant="subtitle1" fontWeight={600}>
                  Ubah Password
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: '#9E9E9E' }}
                >
                  Ubah password anda untuk kemanan profile
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                startIcon={<EditIcon />}
                color="primary"
                variant="contained"
                disableElevation
                onClick={() => navigate('/settings/password')}
                sx={{
                  color: 'white',
                  minHeight: '44px',
                  borderRadius: '12px',
                }}
              >
                <Typography sx={{ ml: '10px' }} variant="subtitle2">
                  Edit
                </Typography>
              </Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Box>
  )
}

export default Settings
