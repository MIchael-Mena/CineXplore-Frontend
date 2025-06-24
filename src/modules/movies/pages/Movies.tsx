import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
import type { Movie } from "../../../utils/Movies";



const MoviesList = ({ movies }:{movies:Movie[]}) => {
  return (
  <Box sx={{ flexGrow: 1, padding: 2 }}>
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card>
            {movie.coverUrl && (
              <CardMedia
                component="img"
                height="300"
                image={movie.coverUrl}
                alt={movie.title}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {movie.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Duración: {movie.durationMin} min<br />
                Estreno: {movie.releaseDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);};

export default MoviesList;