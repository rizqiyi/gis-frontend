import React from 'react'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import TypicalIcon from '@icons/typical-ic.svg'
import DepthIcon from '@icons/depth-ic.svg'
import WidthIcon from '@icons/width-ic.svg'
import ConditionIcon from '@icons/condition-ic.svg'
import useStyles from './DetailStreet.styles'

interface IDetailStreet {
  data: {
    typical: string
    drainase_depth: number
    drainase_width: number
    drainase_condition: string
  }
}

const DetailStreet: React.FC<IDetailStreet> = ({
  data,
}: IDetailStreet): JSX.Element => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.outerPaper}>
      <Box display="flex" gap="12px" width="100%">
        <Paper elevation={0} className={classes.innerPaper}>
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
        <Paper elevation={0} className={classes.innerPaper}>
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
      <Box display="flex" gap="12px" marginTop="12px" width="100%">
        <Paper elevation={0} className={classes.innerPaper}>
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
        <Paper elevation={0} className={classes.innerPaper}>
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
    </Paper>
  )
}

export default DetailStreet
