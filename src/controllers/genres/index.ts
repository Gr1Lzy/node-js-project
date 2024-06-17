import { Request, Response } from 'express';
import httpStatus from 'http-status';
import log4js from 'log4js';
import { createGenre as saveGenre, getGenresByMovieId as getGenres, countGenresByMoviesId as countGenres } from 'src/services/genre';
import { InternalError } from 'src/system/internalError';

// GET /api/genres
export const getGenreByMovieID = async (req: Request, res: Response) => {
  const { movie_id, size, from } = req.query;
  try {
    const genres = await getGenres(String(movie_id), Number(size), Number(from));
    if (!genres) {
      res.status(httpStatus.NOT_FOUND).send();
    } else {
      res.send({
        genres,
      });
    }
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error(`Error in retrieving genres for movie_id ${movie_id}.`, err);
    res.status(status).send({ message });
  }
};

// POST /api/genres
export const createGenre = async (req: Request, res: Response) => {
  const { name, movie_id } = req.body;
  try {
    const genre = await saveGenre(name, movie_id);
    res.status(httpStatus.CREATED).send({
      genre,
    });
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in creating genre.', err);
    res.status(status).send({ message });
  }
};

// POST /api/genres/_counts
export const countGenresByMovieId = async (req: Request, res: Response) => {
  const { movies_id } = req.body;
  try {
    const counts = await countGenres(movies_id);
    res.send({
      counts,
    });
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error(`Error in counting genres for movies_id ${movies_id}.`, err);
    res.status(status).send({ message });
  }
};
