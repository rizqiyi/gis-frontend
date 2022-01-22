import React, { useState } from 'react'
import useDrainaseRead from '@/services/hooks/dashboard/useDrainaseRead'
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import Breadcrumbs from '@components/Breadcrumbs'
import { useParams } from 'react-router-dom'
import DetailData from './partials/DetailData'
import ActionButton from './partials/ActionButton'
import DetailHeader from './partials/DetailHeader'
import TabContent from './partials/TabContent'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

const DetailDrainase = (): JSX.Element => {
  const { id }: { [key: string]: string | undefined } = useParams()
  const { drainase, loading } = useDrainaseRead(false, id as string)
  const [values, setValues] = useState(0)

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()

    setValues(newValue)
  }

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ width: '100%', display: 'block' }}>{children}</Box>
        )}
      </div>
    )
  }

  return (
    <Box>
      <Breadcrumbs
        loading={loading}
        additionalDetailText={drainase.street_name}
      />
      <Grid container spacing={4}>
        <Grid item xs={6} md={6} lg={5}>
          <Paper
            sx={{
              boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              border: '1px solid #DDDFE5',
            }}
          >
            <DetailHeader drainase={drainase} loading={loading} />
            <Box borderBottom="1px solid #DDDFE5" margin="0 0 40px 0" />
            <DetailData drainase={drainase} loading={loading} />
            <Box borderBottom="1px solid #DDDFE5" margin="0 0 40px 0" />
            <ActionButton loading={loading} />
          </Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={7}>
          <Paper
            sx={{
              boxShadow: '0px 12px 32px rgba(112, 144, 176, 0.08)',
              border: '1px solid #DDDFE5',
            }}
          >
            <Tabs
              value={values}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                padding: '27px 40px 0 40px',
                borderBottom: '1px solid #DDDFE5',
              }}
              variant="fullWidth"
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab
                label={
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Drainase Kiri
                  </Typography>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Drainase Kanan
                  </Typography>
                }
                {...a11yProps(1)}
              />
            </Tabs>
            <TabPanel value={values} index={0}>
              <TabContent data={drainase} name="left" loading={loading} />
            </TabPanel>
            <TabPanel value={values} index={1}>
              <TabContent data={drainase} name="right" loading={loading} />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DetailDrainase
