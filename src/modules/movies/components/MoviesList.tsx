import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CardMovie from './MovieCard';
import type { Movie } from '../models/Movie';
import { useState } from 'react';

const MoviesList = ({ movies }: { movies: Movie[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const filteredMovies = movies.filter((m) =>
    searchQuery
      ? m.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <>
      <Box>
        <TextField
          label="Buscar pelicula"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
              <CardActionArea onClick={() => handleOpenModal(movie)}>
                <CardMovie coverUrl={movie.coverUrl!} title={movie.title} />
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          {selectedMovie && (
            <>
              <CardMedia
                component="img"
                image={selectedMovie.coverUrl}
                alt={selectedMovie.title}
                sx={{ borderRadius: 2, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                {selectedMovie.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedMovie.description}
              </Typography>
              <Typography variant="caption" display="block">
                Duración: {selectedMovie.durationMin} min
              </Typography>
              <Typography variant="caption" display="block">
                Estreno: {selectedMovie.releaseDate}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MoviesList;
