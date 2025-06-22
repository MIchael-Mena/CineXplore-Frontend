import MovieCard from "@/components/MovieCard";
import { useGetMovies } from "@/hooks/useMovie";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function MovieSection() {
    const { data: movies, isLoading, isError, error } = useGetMovies()
    const [searchQuery, setSearchQuery] = useState('')

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading || !movies) return <div>Loading movies...</div>
    if (movies.length === 0) return <div>There are no available movies.</div>

    const filteredMovies = movies.filter(m => m.title.toLowerCase() == searchQuery.toLowerCase())

    return (
        <Box
            width={'50%'}
            display={'flex'}
            flexDirection={'column'}
        >
            <Box>
                <TextField
                    label="Buscar Alimento"
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
                    <MovieCard {...m} />
                ))}
            </Box>
        </Box>
        
    )
}