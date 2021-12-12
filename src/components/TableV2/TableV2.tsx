import React from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const TableV2 = (): JSX.Element => {
  return (
    <Box>
      <Box sx={{ p: '32px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '40px',
          }}
        >
          <Box sx={{ marginLeft: '18px' }}>
            <Typography fontWeight={600} variant="subtitle1">
              No
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: '90px',
              gap: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                Tanggal Dibuat
              </Typography>
            </Box>
            <Box sx={{ minWidth: '80px' }}>
              <Typography fontWeight={600} variant="subtitle1">
                Kabupaten
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                Kecamatan
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                Lebar Jalan (m)
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                STA (m)
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: '60px',
            }}
          >
            <Typography variant="subtitle2">Status</Typography>
          </Box>
        </Box>
      </Box>
      <Paper
        sx={{
          p: '32px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              backgroundColor: '#FAFAFA',
            }}
            aria-label="expand"
          >
            <AddIcon />
          </IconButton>
          <Box sx={{ marginLeft: '18px' }}>
            <Typography fontWeight={600} variant="subtitle1">
              No
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: '90px',
              gap: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                2 Des 2021, 15:30
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                Bojonegoro
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                Sumberrejo
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                8 Meter
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={600} variant="subtitle1">
                100 Meter
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '53px',
              height: '30px',
              padding: '5px 16px',
              backgroundColor: '#33C863',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFFFFF',
              borderRadius: '8px',
              marginLeft: '60px',
            }}
          >
            <Typography variant="subtitle2">Tampil</Typography>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary" aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  )
}

export default TableV2
