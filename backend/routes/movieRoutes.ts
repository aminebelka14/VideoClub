import express, { Request, Response } from 'express';
import axios from 'axios';
import { Movie } from '../types/movieTypes';
import { insertMovies, getPopularMoviesFromDB, searchMoviesInDB, getMovieCount } from '../db/movieModel';

const router = express.Router();

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const cachePopularMovies = async (): Promise<void> => {
  const apiKey: string = process.env.TMDB_API_KEY as string;
  const url: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  
  try {
    const response = await axios.get<TMDBResponse>(url);
    const movies: Movie[] = response.data.results;
    await insertMovies(movies);
  } catch (err) {
    console.error('Error fetching popular movies:', err);
  }
};

const searchAndCacheMovies = async (query: string): Promise<Movie[]> => {
  const apiKey: string = process.env.TMDB_API_KEY as string;
  const url: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get<TMDBResponse>(url);
    if (response.data.results.length > 0) {
      await insertMovies(response.data.results);
    }
    return response.data.results;
  } catch (err) {
    console.error('Error searching movies:', err);
    throw err;
  }
};

// GET /api/movies/popular
router.get('/popular', async (req: Request, res: Response) => {  
  try {
    const movieCount: number = await getMovieCount();
    if (movieCount === 0) {
      await cachePopularMovies();
    }
    const popularMovies: Movie[] = await getPopularMoviesFromDB();
    res.json(popularMovies);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch popular movies'});
  }
});

// GET /api/movies/search
router.get('/search', async (req: Request, res: Response) => {
  const query: string = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  try {
    let movies = await searchMoviesInDB(query);
    if (movies.length === 0) {
      console.log(`No movies found in DB for query: ${query}. Fetching from TMDB...`);
      movies = await searchAndCacheMovies(query);
    }
    res.json(movies);
  } catch (err) {
    res.status(500).json({error: 'Failed to search movies'});
  }
});

// Export function to initialize movie cache
export const initializeMovieCache = async () => {
  try {
    await cachePopularMovies();
  } catch (err) {
    console.error('Error caching movies:', err);
  }
};

export default router;