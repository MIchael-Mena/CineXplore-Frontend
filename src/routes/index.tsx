import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.authenticated) {
      throw redirect({ to: '/movies' })
    } else {
      throw redirect({ to: '/login' })
    }
  },
  component: () => null,
})
