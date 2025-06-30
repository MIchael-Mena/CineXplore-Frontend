import { Box, Paper, Typography } from '@mui/material';

const AccesDeniedDashboard = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'background.default',
        zIndex: 10,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 320, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Acceso denegado
        </Typography>
        <Typography color="text.secondary">
          Debes estar logueado como administrador para ver este contenido.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AccesDeniedDashboard;
