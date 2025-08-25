import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    IconButton, 
    Box,
    Fade
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useState } from 'react'
import { useMovieContext } from "../contexts/MovieContext"
import "../css/MovieCard.css"

export default function MovieCard({movie}) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false);
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    const handleImageError = () => {
        setImageError(true);
    }

    const getImageSrc = () => {
        if (imageError || !movie.poster_path) {
            return '/src/assets/signal_lost.png';
        }
        return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    return (
        <Card 
            sx={{ 
                width: 200,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                },
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={getImageSrc()}
                    onError={handleImageError}
                    sx={{ objectFit: 'cover' }}
                    alt={movie.title}
                />
                <Fade in={isHovered}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            p: 1
                        }}
                    >
                        <IconButton
                            onClick={onFavoriteClick}
                            sx={{
                                color: favorite ? '#ff4757' : 'white',
                                bgcolor: 'rgba(0,0,0,0.5)',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.8)'
                                }
                            }}
                        >
                            {favorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </Box>
                </Fade>
            </Box>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" component="h3" noWrap>
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.split("-")[0]}
                </Typography>
            </CardContent>
        </Card>
    )
}