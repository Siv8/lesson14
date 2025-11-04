import express from 'express';
import { getMovies, createMovieController, getMovieByIdController,updateMovieController } from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovieController)
router.get('/:id', getMovieByIdController);
router.put('/:id',updateMovieController);
export default router;
