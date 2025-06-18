import { Button, CircularProgress, Typography } from '@mui/material'
import { ReactNode } from 'react'

export interface ButtonProps {
  text: string
  icon: ReactNode
  onClick: () => void
  color?: 'blue' | 'lightBlue' | 'whiteButton' | 'textWhiteButton' | 'textBlueButton'
  isLoading?: boolean
  disabled?: boolean
}

const IconButton = ({ text, icon, onClick, color = 'blue', isLoading = false, disabled = false }: ButtonProps) => {
  const isLogout = color === 'textWhiteButton'

  return (
    <Button
      type="button"
      variant={isLogout ? 'outlined' : 'contained'}
      onClick={onClick}
      disabled={disabled}
      endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : icon}
      sx={{
        textTransform: 'none',
        borderRadius: 20,
        fontWeight: 600,
        fontSize: '0.95rem',
        px: 3,
        py: 1.5,
        minWidth: 160,
        color: isLogout ? '#fff' : undefined,
        border: isLogout ? '1px solid rgba(255, 255, 255, 0.3)' : undefined,
        backgroundColor: isLogout ? 'transparent' : undefined,
        transition: 'all 0.3s ease-in-out',

        ...(isLogout && {
          '&:hover': {
            backgroundColor: '#c62828', // más elegante que rojo puro
            color: '#fff',
            boxShadow: '0 4px 12px rgba(198, 40, 40, 0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
          },
          '&:active': {
            transform: 'scale(0.97)',
            backgroundColor: '#b71c1c',
            boxShadow: 'inset 0 0 8px rgba(183,28,28,0.4)',
          },
        }),
      }}
    >
      <Typography>{text}</Typography>
    </Button>
  )
}

export default IconButton
