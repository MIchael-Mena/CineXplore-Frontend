import TextInput from '@components/forms/inputs/Text'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps {
  label: string
  name: string
  isNumeric?: boolean
  register?: UseFormRegisterReturn
  styles?: React.CSSProperties
  showHelperText?: boolean
  secondaryLabel?: string
  inputWidth?: string
  isURL?: boolean
  required?: boolean
  bgColor?: string
  readOnly?: boolean
  disabled?: boolean
  showHelperOnFilledOnly?: boolean
  customHelperText?: string
  minValue?: number
  maxValue?: number
}

const CustomInput = ({
  label,
  name,
  styles,
  register,
  showHelperText = false,
  secondaryLabel,
  inputWidth,
  isURL = false,
  required = true,
  bgColor,
  isNumeric = false,
  readOnly = false,
  disabled = false,
  showHelperOnFilledOnly = false,
  customHelperText,
  minValue,
  maxValue,
}: InputProps) => {
  const registerOptions = {
    ...(required && { required: '*Este campo es obligatorio' }),
    ...(isNumeric && {
      pattern: {
        value: /^[0-9]*$/,
        message: 'Solo se permiten números',
      },
      ...(minValue !== undefined && {
        min: {
          value: minValue,
          message: `El valor mínimo es ${minValue}`,
        },
      }),
      ...(maxValue !== undefined && {
        max: {
          value: maxValue,
          message: `El valor máximo es ${maxValue}`,
        },
      }),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value && !/^[0-9]*$/.test(value)) {
          e.target.value = value.replace(/[^0-9]/g, '')
        }
      },
    }),
    ...(isURL && {
      pattern: {
        value: /^[a-z0-9-]+$/,
        message: 'Solo se permiten letras minúsculas, números y guiones medios',
      },
    }),
  }

  return (
    <TextInput
      name={name}
      registerOptions={registerOptions}
      InputType={isNumeric ? 'number' : 'text'}
      label={label}
      styles={styles}
      showHelperText={showHelperText}
      secondaryLabel={secondaryLabel}
      inputWidth={inputWidth}
      bgColor={bgColor}
      readOnly={readOnly}
      disabled={disabled}
      showHelperOnFilledOnly={showHelperOnFilledOnly}
      customHelperText={customHelperText}
      minValue={minValue}
      maxValue={maxValue}
      {...register}
    />
  )
}

export default CustomInput
