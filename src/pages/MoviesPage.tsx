import apiEndpoints from '../constants/apiEndpoints';
import { useApiService } from '../hooks/useApiService';
import MoviesList from '../modules/movies/components/MoviesList';
import type { Movie } from '../modules/movies/models/Movie';
import { ApiService } from '../services/api.service';
import { useState } from 'react';
import { Box, TextField, CircularProgress, Alert } from '@mui/material';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies = [],
    loading,
    error,
  } = useApiService<Movie[], object>(() =>
    ApiService.getData(apiEndpoints.movies.getAll, {})
  );

  const filteredMovies = movies.filter((m) =>
    searchQuery
      ? m.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <TextField
        label="Buscar película..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          Ocurrió un error al cargar las películas.
        </Alert>
      )}
      {!loading && !error && <MoviesList movies={filteredMovies} />}
    </Box>
  );
};

export default Movies;
