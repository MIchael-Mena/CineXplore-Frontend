import { fakeMovies } from '../../utils/MoviesApi';
import MoviesList from './components/MoviesList';

const Movies = () => {
  return (
    <>
      <MoviesList movies={fakeMovies} />
    </>
  );
};
export default Movies;
