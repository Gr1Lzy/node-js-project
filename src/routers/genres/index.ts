import express from 'express';
import {
  getGenreByMovieID,
  createGenre,
  countGenresByMovieId,
} from 'src/controllers/genres';

const router = express.Router();

router.get('/', getGenreByMovieID);
router.post('/', createGenre);
router.post('/_counts', countGenresByMovieId);

export default router;
