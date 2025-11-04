import db from '../config/db.js';
import pool from '../config/db.js'

export interface Movie {
    name: string;
}

export const getAllMovies = async (): Promise<Movie[]> => {
  const result = await pool.query('SELECT *FROM movies');
  console.log('Movies fetched from database:', result);
  return result;
}

export const createMovie = async (name: string): Promise<Movie[]> => {
    const result = await pool.query(
        'INSERT INTO movies (name) VALUES ($1) RETURNING *', [name]
    );
    return result;
}

export const getMovieById = async (id: number): Promise<Movie | null> => {
  const movie = await db.oneOrNone<Movie>('SELECT * FROM movies WHERE id = $1', [id]);
  return movie;
};
export const updateMovie = async (id: number, name: string, year?: number): Promise<Movie | null> => {
  const movie = await db.oneOrNone<Movie>(
    `UPDATE movies
     SET name = $1, year = $2
     WHERE id = $3
     RETURNING *`,
    [name, year, id]
  );
  return movie;
};