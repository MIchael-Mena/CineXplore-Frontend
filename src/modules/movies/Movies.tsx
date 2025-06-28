import MockMovies from '../../utils/MockMovies';
import MoviesList from './components/MoviesList';

const Movies = () => {
  return (
    <>
      <MoviesList movies={MockMovies} />
    </>
  );
};
export default Movies;
