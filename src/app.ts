import express from 'express';
import moviesRoutes from './routes/moviesRoutes.js'
import actorRoutes from './routes/actorsRoutes.js';
const app = express();

app.use(express.json());
app.use('/api/movies', moviesRoutes);
app.use('/api/actor', actorRoutes);

export default app;
