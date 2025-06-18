import { Link as RouterLink } from '@tanstack/react-router'
import MuiLink from '@mui/material/Link'

const CustomLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <MuiLink component={RouterLink} to={to}>
    {children}
  </MuiLink>
)

export default CustomLink
