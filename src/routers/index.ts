import express from 'express';
import ping from 'src/controllers/ping';
import genres from './genres';

const router = express.Router();

router.get('/ping', ping);

router.use('/api/genres', genres);

export default router;
