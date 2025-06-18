import { Box } from '@mui/material'
import RightArrowButton from '@/components/buttons/RightArrowButton'

interface ModalSubmitButtonProps {
  text: string
  handleClick: () => void
  isLoading?: boolean
}

const ModalSubmitButton = ({ text, handleClick, isLoading }: ModalSubmitButtonProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 20 }}>
      <RightArrowButton text={text} color="blue" onClick={handleClick} isLoading={isLoading} />
    </Box>
  )
}

export default ModalSubmitButton
