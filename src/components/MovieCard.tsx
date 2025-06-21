import { Movie } from "@/schemas/movies";
import { ImageNotSupported } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function MovieCard(movie: Movie) {
    return (
        <Card
            sx={{
                maxWidth: 200,
                width: '100%',
                aspectRatio: '2 / 3',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ flex: 1, position: 'relative' }}>
                {movie.coverUrl ? (
                    <CardMedia
                        component="img"
                        image={movie.coverUrl}
                        alt={movie.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <ImageNotSupported sx={{ fontSize: 60, color: '#b0b0b0' }} />
                    </Box>
                )}
            </Box>
            <CardContent sx={{ p: 1, bgcolor: '#fafafa', textAlign: 'center' }}>
                <Typography variant="subtitle1" noWrap>
                    {movie.title}
                </Typography>
            </CardContent>
        </Card>
    )
}