import { Request, Response } from 'express';
import { getMoviesByActorId } from '../models/actorModel';

export const getMoviesForActor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid actor ID' });
      return;
    }

    const movies = await getMoviesByActorId(id);

    if (!movies.length) {
      res.status(404).json({ message: 'No movies found for this actor' });
      return;
    }

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies for actor: ' + error });
  }
};