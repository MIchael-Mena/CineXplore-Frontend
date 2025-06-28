import { Box, Card, Typography, IconButton } from '@mui/material';
import { SearchOff, RefreshOutlined } from '@mui/icons-material';
import notFoundImage from '../../../../assets/images/city-not-found.png';

export const CardNotFound = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => {
  const defaultMessage = 'No se encontraron resultados';

  return (
    <Card
      sx={{
        p: 4,
        m: 2,
        maxWidth: '400px',
        height: 'auto',
        borderRadius: 3,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Icono principal */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}
        >
          <SearchOff sx={{ fontSize: 40, color: 'white' }} />
        </Box>
      </Box>

      {/* Mensaje principal */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          mb: 1,
        }}
      >
        {message || defaultMessage}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 3,
          lineHeight: 1.6,
          color: '#718096',
        }}
      >
        Intenta ajustar los filtros de búsqueda o explorar otras opciones
        disponibles.
      </Typography>

      {/* Imagen ilustrativa */}
      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden',
          opacity: 0.8,
        }}
      >
        <img
          src={notFoundImage}
          alt="not found"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '150px',
            objectFit: 'cover',
            filter: 'grayscale(20%)',
          }}
        />
      </Box>

      {/* Botón de reintentar (opcional) */}
      {onRetry && (
        <IconButton
          onClick={onRetry}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <RefreshOutlined />
        </IconButton>
      )}
    </Card>
  );
};
