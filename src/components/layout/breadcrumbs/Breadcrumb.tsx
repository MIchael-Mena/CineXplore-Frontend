import Typography from '@mui/material/Typography/Typography'
import Link from '@components/CustomLink'

interface Props {
  text: string
  to: string
  isLast: boolean
}

const Breadcrumb = ({ text, to, isLast }: Props) => {
  if (isLast)
    return (
      <Typography color="primary.dark" ml={10}>
        {text}
      </Typography>
    )

  return (
    <Link to={to}>
      <Typography color="primary.main">{text}</Typography>
    </Link>
  )
}

export default Breadcrumb
