import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}))

interface ICustomizedAccordions {
  title: string
  children: React.ReactNode
}

const CustomizedAccordions: React.FC<ICustomizedAccordions> = ({
  title,
  children,
}: ICustomizedAccordions) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography
            sx={{
              transition: 'color 0.2s ease-in-out',
              color: (theme) =>
                expanded === 'panel1'
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
            }}
            fontWeight={600}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <MuiAccordionDetails
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </MuiAccordionDetails>
      </Accordion>
    </div>
  )
}

export default CustomizedAccordions
