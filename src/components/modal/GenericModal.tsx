import { Modal, Box, Typography, Fade } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode } from 'react'

interface GenericModalProps {
  open: boolean
  handleClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
  maxWidth?: string
  maxHeight?: string
  extra?: ReactNode // Extra content at the bottom of the modal
  timeout?: number
  alignment?: string
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '784px',
  maxHeight: '600px',
  bgcolor: '#FFFFFF',
  borderRadius: '30px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 24,
}

const GenericModal = ({
  open,
  handleClose,
  title,
  subtitle,
  children,
  maxWidth = '784px',
  maxHeight = '610px',
  extra = null,
  alignment,
  timeout = 300,
}: GenericModalProps) => {
  const customStyle = {
    ...style,
    maxWidth,
    maxHeight,
    border: 'none',
    borderStyle: 'none',
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ border: 'none', borderStyle: 'none' }}
      slotProps={{ backdrop: { timeout } }}
    >
      <Fade in={open} timeout={timeout}>
        <Box sx={customStyle}>
          <Box onClick={handleClose} sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
            <CloseIcon />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              backgroundColor: '#ECEEEF',
              padding: '16px',
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#2167AE', borderRadius: '8px' },
            }}
          >
            {title && <Typography fontSize={24}>{title}</Typography>}
            {subtitle && <Typography>{subtitle}</Typography>}
            {children}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: alignment ? alignment : 'flex-end', cursor: 'pointer' }}>
            {extra}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default GenericModal
