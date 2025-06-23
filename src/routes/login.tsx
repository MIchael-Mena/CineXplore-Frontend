import { createFileRoute, redirect } from '@tanstack/react-router'
import { Box, Stack } from '@mui/material'
import ImageOverlay from '@screens/login/ImageOverlay'
import Navbar from '@components/layout/Navbar'
import LoginForm from '@screens/login/LoginForm'

export const Route = createFileRoute('/login')({
  component: LoginPage,
  // beforeLoad: ({ context }) => {
  //   const { user } = context.authenticated
  //   if (user) {
  //     throw redirect({ to: '/dashboard' })
  //   }
  // },
})

function LoginPage() {
  return (
    <Box bgcolor="secondary.main" display="flex" flexDirection="column" height="100vh">
      <Navbar hideOptions />
      <Stack direction="row" flexGrow={1} minHeight={0}>
        <Box flex={1} display="flex" alignItems="flex-start" justifyContent="center" px={4} pt={{ xs: 40, md: 100 }}>
          <Box width="100%" maxWidth="430px" mx={{ xs: 'auto', md: 'auto' }}>
            <LoginForm />
          </Box>
        </Box>
        <ImageOverlay />
      </Stack>
    </Box>
  )
}
