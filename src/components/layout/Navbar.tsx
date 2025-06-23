import { AppBar, Toolbar, Button } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import LogoutIcon from '@assets/icons/logout.svg?react'
import Img from '@components/CustomImage'
import Logo from '/logo.svg'
import useAuthStore from '@/store/auth'
import { useQueryClient } from '@tanstack/react-query'

const Navbar = ({ hideOptions = false }: { hideOptions?: boolean }) => {
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.clearToken)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate({ to: '/login', replace: true })
  }

  return (
    <AppBar position="static" elevation={0} sx={{ height: 100, px: 50, py: 8, zIndex: 2 }}>
      <Toolbar sx={{ height: 100, justifyContent: 'space-between' }}>
        <Img src={Logo} alt="Logo" sx={{ cursor: 'pointer' }} onClick={() => navigate({ to: '/' })} />

        {!hideOptions && (
          <Button
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
            sx={{
              borderRadius: 30,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              px: 3,
              py: 1.5,
              minWidth: 160,
              color: '#fff',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease-in-out',

              '&:hover': {
                backgroundColor: '#c62828',
                color: '#fff',
                boxShadow: '0 0 12px rgba(198, 40, 40, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
              },

              '&:active': {
                backgroundColor: '#b71c1c',
                transform: 'scale(0.97)',
                boxShadow: 'inset 0 0 6px rgba(183,28,28,0.4)',
              },
            }}
          >
            Cerrar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
