import MockMovies from '../constants/mockMovies';
import MoviesList from '../modules/movies/components/MoviesList';

const Movies = () => {
  return (
    <>
      <MoviesList movies={MockMovies} />
    </>
  );
};
export default Movies;
