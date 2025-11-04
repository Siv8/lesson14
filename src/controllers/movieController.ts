import { Request, Response } from 'express';
import { getAllMovies, createMovie, getMovieById, updateMovie } from '../models/movieModel.js';

export const getMovies = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const movies = await getAllMovies();
        res.json(movies)
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch movies: ' + error})
    }
}

export const createMovieController = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { name } = req.body;
        const response = await createMovie(name)
        res.json(response)
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Failed to create movie: ' + error})
    }
}

export const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const movie = await getMovieById(id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie: ' + error });
  }
};

export const updateMovieController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name, year } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    const updated = await updateMovie(id, name, year);

    if (!updated) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update movie: ' + error });
  }
};