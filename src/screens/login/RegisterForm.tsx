import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material'
import { PasswordInputWithValidation, GenericInput, UsernameInput } from '@components/forms/inputs/loginInputs'
import FormContainer from '@components/forms/Container'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRegister } from '@hooks/useAuth'
import { enqueueSnackbar } from 'notistack'
import { ApiError } from '@/api/errorHandler'
import { useNavigate } from '@tanstack/react-router'
import { useWatch } from 'react-hook-form'
import { RegisterInput, defaultRegisterInput } from '@/schemas/auth'

const RegisterForm = () => {
  const { mutateAsync: registerAsyncFn, isPending } = useRegister()
  const navigate = useNavigate()

  const methods = useForm<RegisterInput>({
    mode: 'onTouched',
    defaultValues: defaultRegisterInput,
  })

  const { handleSubmit, register } = methods

  const onSubmit: SubmitHandler<RegisterInput> = async input => {
    try {
      await registerAsyncFn(input)
      navigate({ to: '/dashboard', replace: true })
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        enqueueSnackbar('Credenciales inválidas', { variant: 'error', key: 'login' })
      }
    }
  }

  return (
    <FormContainer
      isLoading={isPending}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      header="Registrarse"
      buttonText="Registrarse"
      Islogin={true}
      styles={{
        alignItems: 'center',
        minHeight: '100%',
        width: '100%',
        gap: 16,
        justifyContent: 'space-evenly',
        marginTop: 10,
        maxWidth: 500,
      }}
      btnArrow={false}
      colorButton="lightBlue"
    >
      <Stack width="100%" minHeight="20vh" justifyContent="space-evenly" gap={12} mb={20} mt={16}>
        <UsernameInput label="Usuario" register={register('username', { required: 'Este campo is obligatorio' })} />
        <PasswordInputWithValidation
          label="Contraseña"
          register={register('password', { required: 'Este campo es obligatorio' })}
        />
        <GenericInput label="Email" {...register('email', { required: 'Este campo es obligatorio' })} name="email" />
        <FormControl component="fieldset">
          <FormLabel component="legend">Rol</FormLabel>
        </FormControl>
      </Stack>
    </FormContainer>
  )
}

export default RegisterForm
