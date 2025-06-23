import { Button, Typography } from '@mui/material'
import RotatableDownArrow from './RotatableDownArrow'
import Link from '@components/CustomLink'

const BackButton = ({ backpath }: { backpath: string }) => (
  <Button startIcon={<RotatableDownArrow rotate={90} />}>
    <Link to={backpath}>
      <Typography color="primary.dark" sx={{ textDecoration: 'underline', textDecorationThickness: 1 }}>
        Volver
      </Typography>
    </Link>
  </Button>
)

export default BackButton
