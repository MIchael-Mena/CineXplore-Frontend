import TextInput from '@components/forms/inputs/Text'
import PasswordInput from '@components/forms/inputs/Password'
import { emailRegex } from '@utils/constants'
import { UseFormRegisterReturn } from 'react-hook-form'

const required = 'Este campo es obligatorio'

interface InputProps {
  label: string
  name?: string
  color?: 'primary' | 'secondary'
  register?: UseFormRegisterReturn
  validationRules?: {
    minLength?: number
    requireUppercase?: boolean
    requireLowercase?: boolean
    requireNumber?: boolean
    requireSpecialChar?: boolean
  }
}

export const UsernameInput = ({ label, name = 'username', register }: InputProps) => (
  <TextInput
    bgColor="#FFFFFF"
    name={name}
    label={label}
    registerOptions={{ required }}
    color="secondary"
    preserveErrorSpace={true}
    {...register}
  />
)

const emailPattern = { value: emailRegex, message: 'Email inválido' }

export const EmailInput = ({ label, name = 'email' }: InputProps) => (
  <TextInput name={name} label={label} registerOptions={{ required, pattern: emailPattern }} />
)

export const PasswordInputWithValidation = ({
                                              label,
                                              name = 'password',
                                              register,
                                              color = 'secondary',
                                              validationRules = {
                                                minLength: 6,
                                                requireUppercase: false,
                                                requireLowercase: false,
                                                requireNumber: false,
                                                requireSpecialChar: false,
                                              },
                                            }: InputProps) => {
  const registerOptions = {
    required,
  }

  return (
    <PasswordInput
      name={name}
      label={label}
      registerOptions={registerOptions}
      color={color}
      validationRules={validationRules}
      preserveErrorSpace={true}
      {...register}
    />
  )
}

export const GenericInput = ({
                               label,
                               name = 'input',
                               register,
                               inputType = 'text',
                               minValue,
                               maxValue,
                             }: InputProps & { inputType?: string; minValue?: number; maxValue?: number }) => (
  <TextInput
    bgColor="#FFFFFF"
    name={name}
    label={label}
    registerOptions={{}}
    color="secondary"
    preserveErrorSpace={true}
    InputType={inputType}
    minValue={minValue}
    maxValue={maxValue}
    {...register}
  />
)
