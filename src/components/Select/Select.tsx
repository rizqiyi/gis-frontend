import React from 'react'
import { useField } from 'formik'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Theme,
  Select,
  MenuItem,
  InputBase,
  SelectProps,
  InputBaseProps,
} from '@mui/material'
import DangerIcon from '@icons/danger-ic.svg'

interface ICustomInput {
  isFieldError: boolean | undefined
}

const BootstrapInput = styled(
  ({ isFieldError, ...rest }: ICustomInput & InputBaseProps) => (
    <InputBase {...rest} />
  )
)(({ theme, isFieldError }) => ({
  '.MuiInputBase-input': {
    padding: '14px',
    color: theme.palette.text.disabled,
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
  color: '#404040',

  // color: theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-focused': {
    backgroundColor: 'transparent',
    color: '#404040',
    border: isFieldError
      ? `2.2px solid ${theme.palette.error.main}`
      : `2px solid ${theme.palette.primary.main}`,
  },
}))
/* 
 Example 

<Select
  id={drainase.name}
  onChange={handleChange}
  options={drainase.options}
  sx={{ width: '75%' }}
/>
*/

interface IOptions {
  label: string
  value: string | number
}

interface ICustomSelect {
  required?: boolean
  options?: IOptions[]
  withErrorMsg?: boolean
}

const CustomSelect = ({
  required,
  options,
  id,
  withErrorMsg = true,
  ...rest
}: ICustomSelect & SelectProps): JSX.Element => {
  const [field, meta] = useField({ name: id as string })
  const isFieldError =
    required &&
    Boolean(meta.touched) &&
    Boolean(field.name) &&
    Boolean(meta.error)

  return (
    <>
      <Select
        name={id}
        id={id}
        input={<BootstrapInput isFieldError={isFieldError} />}
        label="Test"
        {...rest}
      >
        {options?.map(({ label, value }) => (
          <MenuItem key={`${label}_${id}_${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
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

export default CustomSelect
