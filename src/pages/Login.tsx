import {Stack, Typography} from '@mui/material'
import {PasswordInputWithValidation, UsernameInput} from '@components/forms/inputs/loginInputs'
import FormContainer from '@components/forms/Container'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useLogin} from '@hooks/useAuth'
import {loginInput} from '@schemas/appSchemas/auth'
import {enqueueSnackbar} from 'notistack'
import {ApiError} from '@api/errorHandler'
import {Link, useNavigate} from '@tanstack/react-router'

const LoginForm = () => {
  const {mutateAsync: login, isPending} = useLogin()
  const navigate = useNavigate()

  const methods = useForm<loginInput>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {handleSubmit, register} = methods

  const onSubmit: SubmitHandler<loginInput> = async input => {
    try {
      await login(input)
      navigate({to: '/dashboard', replace: true})
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        enqueueSnackbar('Credenciales inválidas', {variant: 'error', key: 'login'})
      }
    }
  }

  return (
    <FormContainer
      isLoading={isPending}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      header="Inicia sesión"
      buttonText="Iniciar sesión"
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
        <UsernameInput label="Usuario" register={register('username', {required: 'Este campo is obligatorio'})}/>
        <PasswordInputWithValidation
          label="Contraseña"
          register={register('password', {required: 'Este campo es obligatorio'})}
        />
      </Stack>
      <Link to="/register" style={{textDecoration: 'none'}}>
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#1565c0',
              textDecoration: 'underline',
            },
          }}
        >
          Registrarse
        </Typography>
      </Link>
    </FormContainer>
  )
}

export default LoginForm