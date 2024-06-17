import Genre, { IGenre } from 'src/model/genre';
import axios from 'axios';

export const createGenre = async (name: string, movie_id: string): Promise<IGenre> => {
  const resp = await axios.get(`http:/localhost:8081/api/movies/${movie_id}`);

  if (resp.status !== 200) {
    throw new Error(`Movie with ID ${movie_id} does not exist.`);
  }
  const genre = new Genre({ name, movie_id });
  const validationError = genre.validateSync();

  if (validationError) {
    throw new Error(validationError.message);
  }

  return await Genre.create({ name, movie_id });
};

export const getGenresByMovieId = async (movie_id: string, size: number, from: number): Promise<IGenre[]> => {
  return await Genre.find({ movie_id })
    .sort({ createdAt: -1 })
    .skip(from)
    .limit(size);
};

export const countGenresByMoviesId = async (movies_id: string[]): Promise<{ [key: string]: number }> => {
  const counts = await Genre.aggregate([
    { $match: { movie_id: { $in: movies_id } } },
    { $group: { _id: '$movie_id', count: { $sum: 1 } } },
  ]);

  const result: { [key: string]: number } = {};
  counts.forEach((item: { _id: string, count: number }) => {
    result[item._id] = item.count;
  });

  return result;
};
