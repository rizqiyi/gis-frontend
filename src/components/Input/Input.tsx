import React, { memo } from 'react'
import { useField } from 'formik'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { Box, Typography, Theme } from '@mui/material'
import DangerIcon from '@icons/danger-ic.svg'

interface ICustomInput {
  isFieldError: boolean | undefined
}

const CustomInput = styled(
  ({ isFieldError, ...rest }: ICustomInput & TextFieldProps) => (
    <TextField
      InputProps={{
        disableUnderline: true,
        ...rest.InputProps,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
)(({ theme, isFieldError }) => ({
  '& .MuiFilledInput-root': {
    '.MuiFilledInput-input': {
      padding: '14px',
    },
    border: isFieldError
      ? `2.2px solid ${theme.palette.error.main}`
      : '1px solid #DDDFE5',
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
      border: isFieldError
        ? `2.2px solid ${theme.palette.error.main}`
        : `2px solid ${theme.palette.primary.main}`,
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

const Input = ({
  name,
  required,
  id,
  withErrorMsg = true,
  ...rest
}: TextFieldProps & { withErrorMsg?: boolean }): JSX.Element => {
  const [field, meta] = useField({ name: id as string })
  const isFieldError =
    required &&
    Boolean(meta.touched) &&
    Boolean(field.name) &&
    Boolean(meta.error)

  return (
    <>
      <CustomInput
        name={id}
        id={id}
        isFieldError={isFieldError}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {isFieldError && withErrorMsg && (
        <Box
          sx={{
            mt: '12px',
            display: 'flex',
            color: (theme: Theme) => theme.palette.error.main,
          }}
        >
          <img src={DangerIcon} alt="danger" />
          <Typography sx={{ ml: '15px' }} variant="caption" fontWeight={600}>
            {meta.error}
          </Typography>
        </Box>
      )}
    </>
  )
}

export default memo(Input)
