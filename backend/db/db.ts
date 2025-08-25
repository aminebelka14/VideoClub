import sqlite3 from 'sqlite3';
const sqlite3Verbose = sqlite3.verbose();

const db = new sqlite3Verbose.Database('movies.db')

db.run(`CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    release_date TEXT NOT NULL,
    overview TEXT,
    popularity REAL,
    vote_count INTEGER,
    vote_average REAL,
    poster_path TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`);

export default db;