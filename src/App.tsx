import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import useAuthStore from './store/auth'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { authenticated: undefined! },
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

function AppWithAuth() {
  const authenticated: boolean = !!useAuthStore(state => state.token)
  return <RouterProvider router={router} context={{ authenticated }} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <CssBaseline />
        <AppWithAuth />
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
