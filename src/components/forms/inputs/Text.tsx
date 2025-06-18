import { Input, Stack, Box, Typography } from '@mui/material'
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form'

export interface TextInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  registerOptions?: RegisterOptions<T>
  InputType?: string
  endAdornment?: React.ReactNode
  color?: 'primary' | 'secondary'
  styles?: React.CSSProperties
  showHelperText?: boolean
  secondaryLabel?: string
  inputWidth?: string
  bgColor?: string
  readOnly?: boolean
  disabled?: boolean
  showHelperOnFilledOnly?: boolean
  customHelperText?: string
  minValue?: number
  maxValue?: number
  preserveErrorSpace?: boolean
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  InputType,
  registerOptions,
  endAdornment,
  color = 'primary',
  styles,
  showHelperText = false,
  secondaryLabel,
  inputWidth = '100%',
  bgColor,
  readOnly = false,
  disabled = false,
  showHelperOnFilledOnly,
  customHelperText,
  minValue,
  maxValue,
  preserveErrorSpace = false,
}: TextInputProps<T>) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<T>()

  const error = errors[name]?.message as string | undefined
  const currentValue = watch(name)
  const shouldShowHelper = showHelperText && (!showHelperOnFilledOnly || !!currentValue)

  return (
    <Box display={'flex'} flexDirection={'column'} width={inputWidth}>
      <Stack
        sx={{
          backgroundColor: bgColor ? bgColor : '#ECEEEF',
          borderRadius: '100px',
          padding: customHelperText ? '5px' : '12px',
          height: '73px',
        }}
      >
        {shouldShowHelper && (
          <Typography
            sx={{
              color: '#2167AE',
              fontWeight: '600',
              fontSize: '14px',
              marginLeft: '20px',
              opacity: disabled ? 0.7 : 1,
            }}
          >
            {customHelperText ?? label}
          </Typography>
        )}

        <Input
          {...register(name, registerOptions)}
          placeholder={label}
          id={name}
          type={InputType}
          inputProps={
            minValue && maxValue
              ? {
                  min: minValue,
                  max: maxValue,
                }
              : {}
          }
          fullWidth
          disableUnderline
          endAdornment={endAdornment}
          color={color}
          sx={{
            ...styles,
            backgroundColor: bgColor ?? '#ECEEEF',
          }}
          readOnly={readOnly}
          disabled={disabled}
        />
      </Stack>
      {secondaryLabel && (
        <Typography sx={{ color: '#23366F', fontWeight: '600', fontSize: '14px', marginLeft: '32px' }}>
          {secondaryLabel}
        </Typography>
      )}

      {preserveErrorSpace ? (
        <Typography
          color="error.main"
          fontSize={'14px'}
          sx={{
            marginLeft: '32px',
            marginTop: secondaryLabel ? '0px' : '5px',
            minHeight: '20px',
            visibility: error ? 'visible' : 'hidden',
          }}
        >
          {error ?? 'placeholder'}
        </Typography>
      ) : (
        error && (
          <Typography
            color="error.main"
            fontSize={'14px'}
            sx={{
              marginLeft: '32px',
              marginTop: secondaryLabel ? '0px' : '5px',
            }}
          >
            {error}
          </Typography>
        )
      )}
    </Box>
  )
}

export default TextInput
