import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MovieRequest } from '../../movies/models/Movie';

interface MoviesListProps {
  movies: MovieRequest[];
  onRemove: (id: string) => void;
}

const BasicMoviesList = ({ movies, onRemove }: MoviesListProps) => {
  if (movies.length === 0) {
    return (
      <Typography color="text.secondary">
        No hay películas agregadas.
      </Typography>
    );
  }
  return (
    <List>
      {movies.map((movie) => (
        <ListItem
          key={movie.title + movie.releaseDate}
          secondaryAction={
            <IconButton
              edge="end"
              color="error"
              onClick={() => onRemove(String(movie.movieId ?? ''))}
            >
              <DeleteIcon />
            </IconButton>
          }
          sx={{ mb: 1, borderRadius: 1, bgcolor: '#f5f5f5' }}
        >
          <ListItemText
            primary={movie.title}
            secondary={
              <>
                {movie.releaseDate && <span>Estreno: {movie.releaseDate}</span>}
                {movie.durationMin && (
                  <span style={{ marginLeft: 8 }}>
                    | {movie.durationMin} min
                  </span>
                )}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasicMoviesList;
