import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const CustomInput = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{
      ...props.InputProps,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    '.MuiFilledInput-input': {
      padding: '14px',
    },
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      //   boxShadow: `${alpha(the.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

/* 
 Example 

  <CustomInput
    placeholder="Username"
    id="reddit-input"
    variant="filled"
    InputProps={{ disableUnderline: true, startAdornment: <MailOutline /> }}
  />
*/

const Input = (props: TextFieldProps): JSX.Element => {
  return (
    <CustomInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default Input
