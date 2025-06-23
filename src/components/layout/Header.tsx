import { Stack, Typography } from '@mui/material'
import Img from '@components/CustomImage'

interface Props {
  title: string
  iconSrc: string
  alt: string
}

const Header = ({ title, iconSrc, alt }: Props) => (
  <Stack direction="row" alignItems="center" gap={20}>
    <Img src={iconSrc} alt={alt} width={26} />
    <Typography variant="h2">{title}</Typography>
  </Stack>
)

export default Header
