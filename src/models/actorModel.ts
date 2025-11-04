import db from '../config/db';

export interface Actor {
  id: number;
  name: string;
  movie_id: number;
}

export const getMoviesByActorId = async (actorId: number) => {
  const movies = await db.manyOrNone(
    `
    SELECT m.id, m.name, m.year, m.created_at
    FROM movies m
    JOIN actors a ON m.id = a.movie_id
    WHERE a.id = $1
    `,
    [actorId]
  );
  return movies;
};