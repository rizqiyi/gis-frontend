import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import DefaultProfile from '@illust/profile-default.svg'
import ArrowRight from '@icons/arrow-right-ic.svg'
import DrainaseCircleBlue from '@icons/drainase-ic-circle-blue.svg'
import { useNavigate } from 'react-router-dom'

interface ITitle {
  uniq: string
}

const Title: React.FC<ITitle> = ({ uniq }: ITitle): JSX.Element => {
  const navigate = useNavigate()
  const title: { [key: string]: string } = {
    drainase: 'Drainase yang Baru Saja Ditambahkan',
    'user-management': 'User yang Baru Saja Ditambahkan',
  }

  const img: { [key: string]: string } = {
    drainase: DrainaseCircleBlue,
    'user-management': DefaultProfile,
  }

  return (
    <Box
      padding="5px 0"
      width="100%"
      display="flex"
      alignItems="center"
      marginBottom="30px"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <img src={img[uniq]} alt="profile" />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ marginLeft: '16px' }}
        >
          {title[uniq]}
        </Typography>
      </Box>
      <Box>
        <Button
          onClick={() => navigate(`/${uniq}`)}
          disableElevation
          variant="contained"
          sx={{
            color: 'white',
            boxShadow: '0px 8px 20px rgba(31, 169, 231, 0.12)',
            minHeight: '48px',
            borderRadius: '12px',
            width: '163px',
          }}
          endIcon={<img src={ArrowRight} alt="arrow" />}
        >
          <Typography variant="subtitle2">Lihat Semua</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Title
