import { Box, Typography, Grid, Paper } from '@mui/material'
import { Favorite as FavoriteIcon } from '@mui/icons-material'
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

export default function Favorites() {
    const { favorites } = useMovieContext()

    if (favorites.length > 0) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        mb: 4, 
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <FavoriteIcon color="primary" fontSize="large" />
                    Your Favorites
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {favorites.map((movie) => (
                        <Grid item key={movie.id}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Paper 
                sx={{ 
                    p: 6, 
                    textAlign: 'center', 
                    maxWidth: 600,
                    bgcolor: 'rgba(255, 255, 255, 0.05)'
                }}
            >
                <FavoriteIcon 
                    sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} 
                />
                <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                    No Favorite Movies Yet
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Start adding movies to favorites and find them here.
                </Typography>
            </Paper>
        </Box>
    )
}