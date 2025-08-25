import { 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Typography, 
    CircularProgress,
    Alert,
    Paper
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (e) {
                console.error(e)
                setError("Failed to load movies")
            } finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim() || loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (e) {
            console.error(e)
            setError("Failed to search movies")
        } finally {
            setLoading(false)
        }
    }

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Box sx={{ py: 2 }}>
            <Paper 
                component="form" 
                onSubmit={handleSearch}
                sx={{ 
                    p: 2, 
                    mb: 3, 
                    display: 'flex', 
                    gap: 2, 
                    maxWidth: 600, 
                    mx: 'auto' 
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ 
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.paper'
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    disabled={loading}
                    sx={{ minWidth: 120 }}
                >
                    Search
                </Button>
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {filteredMovies.map((movie) => (
                            <Grid item key={movie.id}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                    {filteredMovies.length === 0 && !loading && (
                        <Typography variant="h6" sx={{ textAlign: 'center', py: 4 }}>
                            No movies found
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}