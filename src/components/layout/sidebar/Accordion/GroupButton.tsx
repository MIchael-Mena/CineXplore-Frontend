import Img from '@components/CustomImage'
import Stack from '@mui/material/Stack/Stack'
import Text from './Text'
import Route from '@schemas/routes'
import { ComponentType } from 'react'

interface Props {
  route: Route
  groupIcon: string | ComponentType
  neverBold?: boolean
}

const GroupButton = ({ route, groupIcon: GroupIcon, neverBold }: Props) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={15}
    sx={{
      transition: 'all 0.2s ease-in-out',
    }}
  >
    {typeof GroupIcon === 'string' ? (
      <Img src={GroupIcon} width={22} height={22} />
    ) : (
      <GroupIcon style={{ fontSize: 22 }} />
    )}
    <Text text={route.name} bold={!neverBold && route.active} />
  </Stack>
)

export default GroupButton
