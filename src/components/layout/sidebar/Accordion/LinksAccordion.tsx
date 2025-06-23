import { Stack, Collapse, Box } from '@mui/material'
import CustomLink from '@components/CustomLink'
import DownArrow from '@assets/icons/downArrow.svg'
import Img from '@components/CustomImage'
import Text from './Text'
import GroupButton from './GroupButton'
import Route from '@schemas/routes'

interface AccordionProps {
  route: Route
  groupIcon: string
  subroutes?: Route[]
  expanded: boolean
  onClick: () => void
}

const LinksAccordion = ({ route, groupIcon, subroutes, expanded, onClick }: AccordionProps) => {
  const isActive = route.active

  if (!subroutes?.length)
    return (
      <Box
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          borderRadius: 2,
          px: 9,
          py: 2,
          transition: 'all 0.2s ease-in-out',
          backgroundColor: isActive ? 'primary.light' : 'transparent',
          color: isActive ? '#fff' : 'inherit',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: '#fff',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(5px)',
          },
        }}
      >
        <CustomLink to={'/' + route.to}>
          <GroupButton route={route} groupIcon={groupIcon} />
        </CustomLink>
      </Box>
    )

  return (
    <Stack>
      <Stack
        onClick={onClick}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={expanded ? 5 : 0}
        sx={{
          cursor: 'pointer',
          px: 9,
          py: 2,
          borderRadius: 2,
          backgroundColor: isActive ? 'primary.light' : 'transparent',
          color: isActive ? '#fff' : 'inherit',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: '#fff',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(5px)',
          },
        }}
      >
        <GroupButton route={route} groupIcon={groupIcon} neverBold />
        <Img src={DownArrow} />
      </Stack>

      <Collapse in={expanded}>
        <Stack ml={4} gap={1.5}>
          {subroutes.map(subroute => (
            <CustomLink key={subroute.to} to={`/${route.to}/${subroute.to}`}>
              <Box
                sx={{
                  px: 9,
                  py: 2,
                  borderRadius: 2,
                  backgroundColor: subroute.active ? 'primary.light' : 'transparent',
                  color: subroute.active ? '#fff' : 'inherit',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: '#fff',
                    boxShadow: '0 20px 80px rgba(0, 0, 0, 0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Text text={subroute.name} bold={subroute.active} />
              </Box>
            </CustomLink>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default LinksAccordion
