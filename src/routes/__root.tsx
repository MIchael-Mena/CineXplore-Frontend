import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { AuthContext } from '@hooks/useAuth'
import AuthRedirector from '@/components/authentication/AuthRedirector'

type RouterContext = {
  authenticated: AuthContext
}

function RootComponent() {
  return (
    <>
      <AuthRedirector />
      <Outlet />
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})
