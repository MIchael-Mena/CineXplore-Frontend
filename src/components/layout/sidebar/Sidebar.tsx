import { Stack, useTheme, Divider } from '@mui/material'
import { Fragment, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import LinksAccordion from './Accordion/LinksAccordion'
import { ROUTES_ATHLETE, ROUTES_NUTRICIONIST, ROUTES_TRAINER } from './routes'
import parseRoutes from '@utils/parse/routes'
import { useGetMyProfile } from '@/hooks/useAccount'

const Sidebar = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const handleAccordionChange = (routeName: string) =>
    setExpandedAccordion(prev => (prev === routeName ? null : routeName))

  const location = useLocation()
  const color = useTheme().palette.primary.light

  const { data: profile, isLoading, isError, error } = useGetMyProfile()

  if (isError) return <div>Error: {error.message}</div>
  if (isLoading || !profile) return <div>Loading...</div>

  const { role } = profile
  const ROUTES = role === 'ATLETA' ? ROUTES_ATHLETE : role === 'NUTRICIONISTA' ? ROUTES_NUTRICIONIST : ROUTES_TRAINER
  const routes = parseRoutes(ROUTES, location.pathname, expandedAccordion)

  return (
    <Stack
      maxWidth={358}
      minWidth="310px"
      height="100%"
      p={20}
      pt={20}
      pb={20}
      gap={10}
      borderRight={`3px solid ${color}`}
    >
      {routes.map(route => (
        <Fragment key={route.to}>
          <LinksAccordion
            route={route}
            groupIcon={route.groupIcon}
            expanded={expandedAccordion === route.name}
            onClick={() => handleAccordionChange(route.name)}
            subroutes={route.subroutes}
          />
          <Divider sx={{ mt: 8, mb: 8 }} /> {}
        </Fragment>
      ))}
    </Stack>
  )
}

export default Sidebar
