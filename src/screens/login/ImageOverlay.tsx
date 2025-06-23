import { Box } from '@mui/material'
import LoginImage from '@assets/LoginImage.png'

const ImageOverlay = () => (
  <Box display={{ xs: 'none', md: 'block' }} flex={1} overflow="hidden" height="100%" maxHeight="100vh">
    <Box
      component="img"
      src={LoginImage}
      alt="Login"
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        objectFit: 'cover',
        objectPosition: 'top left',
        display: 'block',
        borderRadius: '100%',
      }}
    />
  </Box>
)

export default ImageOverlay
