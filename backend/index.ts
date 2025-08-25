import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername, getUserByEmail } from './db/userModel';
import { Movie } from './types/movieTypes';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { insertMovies, getPopularMoviesFromDB, searchMoviesInDB, getMovieCount } from './db/movieModel';
import { cachePopularMovies } from './routes/movieRoutes';

import movieRoutes from './routes/movieRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT ?? '5000', 10);

app.use(express.json());
app.use(cors());

app.use('/movies', movieRoutes);
app.use('/api', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('MovieApp backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    cachePopularMovies();
  } catch (err) {
    console.error('Error caching movies:', err);
  }
});
