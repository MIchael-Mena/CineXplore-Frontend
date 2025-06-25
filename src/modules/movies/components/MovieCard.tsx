import { ImageNotSupported } from '@mui/icons-material';
import { Box, Card, CardMedia, Typography } from '@mui/material';

export default function MovieCard({
  coverUrl,
  title,
}: {
  coverUrl: string;
  title: string;
}) {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 200,
        aspectRatio: '2 / 3',
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {coverUrl ? (
        <CardMedia
          component="img"
          image={coverUrl}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageNotSupported sx={{ fontSize: 60, color: '#b0b0b0' }} />
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)', // fondo semitransparente
          color: 'white',
          px: 1,
          py: 1,
        }}
      >
        <Typography variant="subtitle1" noWrap>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
