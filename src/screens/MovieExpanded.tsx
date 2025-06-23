import { Movie } from "@/schemas/movies";
import { Box } from "@mui/material";

export default function MovieExpanded({ movie, width } : { movie: Movie, width: string}) {
    return (
        <Box 
        width={width}
        display={'display'} 
        flexDirection={'column'}
        sx={{
            backgroundImage: movie.coverUrl,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}
        >
            
        </Box>
    )
}