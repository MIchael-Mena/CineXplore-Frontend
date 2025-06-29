import apiEndpoints from '../constants/apiEndpoints';
import { useApiService } from '../hooks/useApiService';
import MoviesList from '../modules/movies/components/MoviesList';
import type { Movie } from '../modules/movies/models/Movie';
import { ApiService } from '../services/api.service';

const Movies = () => {
  const {
    data: movies,
    loading,
    error,
  } = useApiService<Movie[], object>(() =>
    ApiService.getData(apiEndpoints.movies.getAll, {})
  );

  if (error) return <div>Ha ocurrido un error</div>;
  if (loading) return <div>Cargando peliculas: {error}</div>;

  return (
    <>
      <MoviesList movies={movies} />
    </>
  );
};

export default Movies;
