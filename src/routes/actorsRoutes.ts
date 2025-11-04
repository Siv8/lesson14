import express from 'express';
import { getMoviesForActor } from '../controllers/actorController.js';

const router = express.Router();

router.get('/:id/movies', getMoviesForActor);

export default router;