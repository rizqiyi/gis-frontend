import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const CustomInput = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{
      disableUnderline: true,
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
    border: '1px solid #DDDFE5',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
      'border',
      'color',
    ]),
    color: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      color: '#404040',
      //   boxShadow: `${alpha(the.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
      border: '2px solid #1FA9E7',
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
