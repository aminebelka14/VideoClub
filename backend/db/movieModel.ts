import db from './db';
import { Movie } from '../types/movieTypes';
import { deepStrictEqual } from 'assert';

export const insertMovies = (movies: Movie[]): Promise<void> => {
    return new Promise((res, rej) => {
        const stmt = db.prepare(`INSERT OR REPLACE INTO movies
            (id, title, release_date, overview, popularity, vote_count, vote_average, poster_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
        
            for (const movie of movies) {
                stmt.run([
                    movie.id,
                    movie.title,
                    movie.release_date,
                    movie.overview,
                    movie.popularity,
                    movie.vote_count,
                    movie.vote_average,
                    movie.poster_path
                ]);
            }

            db.run("COMMIT", (err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
        stmt.finalize();
    });
};

export const getPopularMoviesFromDB = (): Promise<Movie[]> => {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM movies ORDER BY popularity DESC LIMIT 20", [], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows as Movie[]);
            }
        });
    });
}

export const searchMoviesInDB = (query: string): Promise<Movie[]> => {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM movies WHERE title LIKE ? ORDER BY popularity DESC", [`%${query}%`], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows as Movie[]);
            }
        });
    });
}

export const getMovieCount = (): Promise<number> => {
    return new Promise((res, rej) => {
        db.get("SELECT COUNT(*) as count FROM movies", [], (err, row) => {
            if (err) {
                rej(err);
            } else {
                res(row.count);
            }
        });
    });
}