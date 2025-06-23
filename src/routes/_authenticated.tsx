import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import Navbar from '@components/layout/Navbar'
import { Box, Stack } from '@mui/material'
import Sidebar from '@components/layout/sidebar/Sidebar'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  // beforeLoad: async ({ context }) => {
  //   if (!context.authenticated) throw redirect({ to: '/login' })
  // },
})

function AuthenticatedLayout() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Navbar />
      <Stack direction="row" flexGrow={1} minHeight={0}>
        <Sidebar />
        <Box flexGrow={1} p={40} overflow="auto">
          <Outlet />
        </Box>
      </Stack>
    </Box>
  )
}
