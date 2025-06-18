import { Checkbox, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface Props {
  text?: string
  isChecked: boolean
  onChange: () => void
}

const CheckboxButton = ({ text, isChecked, onChange }: Props) => (
  <Box display="flex" alignItems="center">
    <Checkbox checked={isChecked} onChange={onChange} />
    {text && <Typography>{text}</Typography>}
  </Box>
)

export default CheckboxButton
