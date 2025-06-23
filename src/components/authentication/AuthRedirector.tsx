import { useEffect } from 'react'
import { useNavigate, useRouterState, redirect } from '@tanstack/react-router'
import { useRegister } from '@hooks/useAuth'
import { useSnackbar } from 'notistack'

export const AuthRedirector = () => {
  const { user } = useRegister()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  useEffect(() => {
    if (user && (currentPath === '/login' || currentPath === '/recover-password')) {
      throw redirect({ to: '/dashboard', replace: true })
    } else if (!user && currentPath.startsWith('/_authenticated')) {
      enqueueSnackbar('Tu sesión ha expirado, por favor inicia sesión de nuevo.', { variant: 'info', key: 'logout' })
      throw redirect({ to: '/login', replace: true })
    }
  }, [user, currentPath, navigate, enqueueSnackbar])

  return null
}

export default AuthRedirector
