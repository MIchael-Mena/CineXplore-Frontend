import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/movies?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <Container disableGutters maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido a Cinexplore
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Busca tus películas favoritas y descubre nuevas recomendaciones
      </Typography>
      <Box
        sx={{ display: 'flex', gap: 2, mt: 4, mb: 2, justifyContent: 'center' }}
      >
        <TextField
          label="Buscar película..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() =>
          navigate('/movies', { state: { preventScrollReset: false } })
        }
      >
        Ver todas las películas
      </Button>
    </Container>
  );
};

export default HomePage;
