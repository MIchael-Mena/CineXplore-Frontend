import { createFileRoute } from '@tanstack/react-router'
import { Box, Stack } from '@mui/material'
import ImageOverlay from '@screens/login/ImageOverlay'
import Navbar from '@components/layout/Navbar'
import RegisterForm from '@/screens/login/RegisterForm'

export const Route = createFileRoute('/register')({
  component: Component,
  // beforeLoad: ({ context }) => {
  //   if (context.authenticated) throw redirect({ to: '/dashboard' })
  // },
})

function Component() {
  return (
    <Box bgcolor="secondary.main" display="flex" flexDirection="column" height="fit-content">
      <Navbar hideOptions />
      <Stack direction="row" flexGrow={1} minHeight={0}>
        <Box
          flex={1}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          px={4}
          pt={{ xs: 40, md: 50 }}
          pb={50}
        >
          <Box width="100%" maxWidth="400px" mx={{ xs: 'auto', md: 'auto' }}>
            <RegisterForm />
          </Box>
        </Box>
        <ImageOverlay />
      </Stack>
    </Box>
  )
}
