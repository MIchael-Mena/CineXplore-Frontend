import { Breadcrumbs, Stack } from '@mui/material'
import BackButton from './BackButton'
import RotatableDownArrow from './RotatableDownArrow'
import Breadcrumb from './Breadcrumb'

export interface Pathname {
  title: string
  to: string
}

const CustomBreadcrumbs = ({ pathnames }: { pathnames: Pathname[] }) => {
  const lastIndex = pathnames.length - 1
  const backpath = pathnames[lastIndex - 1].to

  return (
    <Stack direction="row" gap={30} mb={20}>
      <BackButton backpath={backpath} />
      <Breadcrumbs aria-label="breadcrumb" separator={<RotatableDownArrow rotate={270} />}>
        {pathnames.map(({ title, to }, index) => (
          <Breadcrumb text={title} to={to} isLast={index === lastIndex} key={to} />
        ))}
      </Breadcrumbs>
    </Stack>
  )
}

export default CustomBreadcrumbs
