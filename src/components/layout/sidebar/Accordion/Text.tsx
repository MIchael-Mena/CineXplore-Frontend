import Typography from '@mui/material/Typography/Typography'
import { SxProps, Theme } from '@mui/material/styles'

const Text = ({ text, bold, sx }: { text: string; bold: boolean; sx?: SxProps<Theme> }) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: bold ? 700 : 500,
      lineHeight: 1.4,
      color: bold ? '#fff' : 'text.primary',
      transition: 'color 0.3s ease',
      ...sx,
    }}
  >
    {text}
  </Typography>
)

export default Text
