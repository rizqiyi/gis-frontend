/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import TypicalIcon from '@icons/typical-ic.svg'
import DepthIcon from '@icons/depth-ic.svg'
import WidthIcon from '@icons/width-ic.svg'
import ConditionIcon from '@icons/condition-ic.svg'

interface IDetailStreet {
  data: {
    typical: string
    drainase_depth: string
    drainase_width: string
    drainase_condition: string
  }
  note: string
  description: string
  loading: boolean
}

const DetailStreet: React.FC<IDetailStreet> = ({
  data,
  note,
  description,
  loading,
}: IDetailStreet): JSX.Element => {
  return loading ? (
    <Box>
      <Box padding="20px 40px" display="flex" gap="5px">
        <Skeleton variant="rectangular" width="45%" height="64px" />
        <Skeleton variant="rectangular" width="45%" height="64px" />
        <Skeleton variant="rectangular" width="50%" height="64px" />
        <Skeleton variant="rectangular" width="50%" height="64px" />
      </Box>
      <Box borderBottom="1px solid #DDDFE5" margin="20px 0 40px 0" />
      <Box
        padding="0 40px 40px 40px"
        display="flex"
        flexDirection="column"
        gap="5px"
      >
        <Skeleton variant="rectangular" width="100%" height="64px" />
        <Skeleton variant="rectangular" width="100%" height="64px" />
      </Box>
    </Box>
  ) : (
    <Box>
      <Box
        display="flex"
        gap="12px"
        padding="0 24px"
        flexWrap="wrap"
        width="100%"
        flex={1}
      >
        <Box
          sx={{
            height: '64px',
            padding: '12px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Box
            width="52px"
            height="52px"
            sx={{ backgroundColor: '#F4FBFF' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
          >
            <img width="24px" height="24px" src={TypicalIcon} alt="typical" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginLeft="24px"
            gap="4px"
          >
            <Typography
              sx={{ color: '#9E9E9E' }}
              variant="caption"
              fontWeight={400}
            >
              Tipikal
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {data.typical}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: '64px',
            padding: '12px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Box
            width="52px"
            height="52px"
            sx={{ backgroundColor: '#F4FBFF' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
          >
            <img width="24px" height="24px" src={DepthIcon} alt="depth" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginLeft="24px"
            gap="4px"
          >
            <Typography
              sx={{ color: '#9E9E9E' }}
              variant="caption"
              fontWeight={400}
            >
              Tipikal
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {data.drainase_depth} Meter
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        gap="12px"
        padding="0 24px"
        flexWrap="wrap"
        width="100%"
        flex={1}
      >
        <Box
          sx={{
            height: '64px',
            padding: '12px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Box
            width="52px"
            height="52px"
            sx={{ backgroundColor: '#F4FBFF' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
          >
            <img width="24px" height="24px" src={WidthIcon} alt="width" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginLeft="24px"
            gap="4px"
          >
            <Typography
              sx={{ color: '#9E9E9E' }}
              variant="caption"
              fontWeight={400}
            >
              Lebar
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {data.drainase_width} Meter
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: '64px',
            padding: '12px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Box
            width="52px"
            height="52px"
            sx={{ backgroundColor: '#F4FBFF' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
          >
            <img
              width="24px"
              height="24px"
              src={ConditionIcon}
              alt="condition"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginLeft="24px"
            gap="4px"
          >
            <Typography
              sx={{ color: '#9E9E9E' }}
              variant="caption"
              fontWeight={400}
            >
              Kondisi
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {data.drainase_condition}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box borderBottom="1px solid #DDDFE5" margin="20px 0 40px 0" />
      <Box display="flex" flexDirection="column" padding="0 40px 30px 40px">
        <Typography
          sx={{ color: '#9E9E9E' }}
          variant="caption"
          fontWeight={400}
        >
          Catatan
        </Typography>
        <Typography
          sx={{ marginTop: '12px' }}
          variant="subtitle2"
          fontWeight={600}
        >
          {note || '-'}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" padding="0 40px 40px 40px">
        <Typography
          sx={{ color: '#9E9E9E' }}
          variant="caption"
          fontWeight={400}
        >
          Keterangan
        </Typography>
        <Typography
          sx={{ marginTop: '12px' }}
          variant="subtitle2"
          fontWeight={600}
        >
          {description || '-'}
        </Typography>
      </Box>
    </Box>
  )
}

export default DetailStreet
