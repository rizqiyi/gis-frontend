import React from 'react'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import TypicalIcon from '@icons/typical-ic.svg'
import DepthIcon from '@icons/depth-ic.svg'
import WidthIcon from '@icons/width-ic.svg'
import ConditionIcon from '@icons/condition-ic.svg'
import PaperIcon from '@icons/paper-ic.svg'

interface IDetailStreet {
  data: {
    typical: string
    drainase_depth: string
    drainase_width: string
    drainase_condition: string
  }
  note: string
}

const DetailStreet: React.FC<IDetailStreet> = ({
  data,
  note,
}: IDetailStreet): JSX.Element => {
  return (
    <Box>
      <Box
        display="flex"
        gap="12px"
        marginTop="52px"
        padding="0 24px"
        flexWrap="wrap"
        width="100%"
        flex={1}
      >
        <Paper
          elevation={0}
          sx={{
            height: '64px',
            padding: '12px',
            border: '0.8px solid #EDEDED',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#F4FBFF', borderRadius: '4px' }}
            variant="square"
          >
            <img src={TypicalIcon} alt="typical" />
          </Avatar>
          <Box display="flex" flexDirection="column" marginLeft="12px">
            <Typography variant="caption" fontWeight={400}>
              Tipikal
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {data.typical}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            height: '64px',
            padding: '12px',
            border: '0.8px solid #EDEDED',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#F4FBFF', borderRadius: '4px' }}
            variant="square"
          >
            <img src={DepthIcon} alt="depth" />
          </Avatar>
          <Box display="flex" flexDirection="column" marginLeft="12px">
            <Typography variant="caption" fontWeight={400}>
              Kedalaman
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {data.drainase_depth} Meter
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        display="flex"
        gap="12px"
        marginTop="12px"
        padding="0 24px"
        flexWrap="wrap"
        width="100%"
        flex={1}
      >
        <Paper
          elevation={0}
          sx={{
            height: '64px',
            padding: '12px',
            border: '0.8px solid #EDEDED',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#F4FBFF', borderRadius: '4px' }}
            variant="square"
          >
            <img src={WidthIcon} alt="width" />
          </Avatar>
          <Box display="flex" flexDirection="column" marginLeft="12px">
            <Typography variant="caption" fontWeight={400}>
              Lebar
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {data.drainase_width || '-'}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            height: '64px',
            padding: '12px',
            border: '0.8px solid #EDEDED',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flex: '1',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#F4FBFF', borderRadius: '4px' }}
            variant="square"
          >
            <img src={ConditionIcon} alt="condition" />
          </Avatar>
          <Box display="flex" flexDirection="column" marginLeft="12px">
            <Typography variant="caption" fontWeight={400}>
              Kondisi
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {data.drainase_condition}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box marginTop="24px" display="flex" padding="0 24px 24px 24px">
        <img src={PaperIcon} alt="paper" />
        <Typography sx={{ marginLeft: '15px' }} variant="caption">
          {note || '-'}
        </Typography>
      </Box>
    </Box>
  )
}

export default DetailStreet
