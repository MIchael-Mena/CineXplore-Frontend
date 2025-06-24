import { Container} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { fakeMovies } from "../../../utils/Movies";
import MoviesList from "../../movies/pages/Movies";

const Home = () => {
  // const navigate = useNavigate();

  return (
    <Container disableGutters maxWidth="lg">
      <MoviesList movies={fakeMovies} />
      {/* Hola mundo */}
    </Container>
  );
};

export default Home;

