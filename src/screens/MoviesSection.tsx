import MovieCard from "@/components/MovieCard";
import { Movie } from "@/schemas/movies";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface MoviesSectionProps {
  width: string
  movieOptions: Movie[]
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie>>
}

export default function MoviesSection({width, movieOptions, setSelectedMovie} : MoviesSectionProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredMovies = movieOptions.filter(m => m.title.toLowerCase() == searchQuery.toLowerCase())

    return (
        <Box
            width={width}
            display={'flex'}
            flexDirection={'column'}
        >
            <Box>
                <TextField
                    label="Buscar pelicula"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
            >
                {filteredMovies.map(m => (
                    <MovieCard movie={m} onClick={() => setSelectedMovie(m)}/>
                ))}
            </Box>
        </Box>
        
    )
}