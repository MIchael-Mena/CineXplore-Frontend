import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FieldValues, RegisterOptions } from 'react-hook-form'
import TextInput, { TextInputProps } from './Text'
import useToggle from '@hooks/useToggle'

type PasswordInputProps<T extends FieldValues> = Omit<TextInputProps<T>, 'type' | 'endAdornment'> & {
  validationRules?: {
    minLength?: number
    requireUppercase?: boolean
    requireLowercase?: boolean
    requireNumber?: boolean
    requireSpecialChar?: boolean
  }
}

const defaultPasswordLenght = 6

const PasswordInput = <T extends FieldValues>({
  name,
  label,
  registerOptions,
  color,
  validationRules,
  preserveErrorSpace,
}: PasswordInputProps<T>) => {
  const [showPassword, togglePassword] = useToggle(false)

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={togglePassword} edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )

  const finalRegisterOptions: RegisterOptions<T> = { ...registerOptions }

  if (validationRules) {
    const baseValidate = finalRegisterOptions.validate || {}
    finalRegisterOptions.validate = {
      ...baseValidate,

      // Minimum length check
      ...(validationRules.minLength && {
        minLength: (value: string) =>
          value.length >= (validationRules.minLength ?? defaultPasswordLenght) ||
          `La contraseña debe tener al menos ${validationRules.minLength} caracteres`,
      }),

      // Uppercase check
      ...(validationRules.requireUppercase && {
        hasUppercase: (value: string) =>
          /[A-Z]/.test(value) || 'La contraseña debe contener al menos una letra mayúscula',
      }),

      // Lowercase check
      ...(validationRules.requireLowercase && {
        hasLowercase: (value: string) =>
          /[a-z]/.test(value) || 'La contraseña debe contener al menos una letra minúscula',
      }),

      // Number check
      ...(validationRules.requireNumber && {
        hasNumber: (value: string) => /[0-9]/.test(value) || 'La contraseña debe contener al menos un número',
      }),

      // Special character check
      ...(validationRules.requireSpecialChar && {
        hasSpecialChar: (value: string) =>
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
          'La contraseña debe contener al menos un carácter especial',
      }),
    }
  }

  return (
    <TextInput
      name={name}
      label={label}
      registerOptions={finalRegisterOptions}
      bgColor="#FFFFFF"
      InputType={showPassword ? 'text' : 'password'}
      endAdornment={endAdornment}
      color={color}
      preserveErrorSpace={preserveErrorSpace}
    />
  )
}

export default PasswordInput
