import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Genre from 'src/model/genre';
import * as genreService from 'src/services/genre';
import 'src/test/setup';

describe('Genre Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new genre', async () => {
    const movie_id = '60b9f1b8fbed7c002b0de1f2';
    const name = 'Action';

    sinon.stub(axios, 'get').resolves({ status: 200 });

    const genre = await genreService.createGenre(name, movie_id);

    expect(genre).to.have.property('_id');
    expect(genre.name).to.equal(name);
    expect(genre.movie_id).to.equal(movie_id);
  });

  it('should fail to create a genre if movie does not exist', async () => {
    const movie_id = '60b9f1b8fbed7c002b0de1f2';
    const name = 'Action';

    sinon.stub(axios, 'get').resolves({ status: 404 });

    try {
      await genreService.createGenre(name, movie_id);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).to.equal(`Movie with ID ${movie_id} does not exist.`);
      } else {
        throw err;
      }
    }
  });

  it('should get genres by movie ID', async () => {
    const movie_id = '60b9f1b8fbed7c002b0de1f2';
    await new Genre({ name: 'Action', movie_id }).save();
    await new Genre({ name: 'Comedy', movie_id }).save();

    const genres = await genreService.getGenresByMovieId(movie_id, 10, 0);

    expect(genres.length).to.equal(2);
  });

  it('should count genres by movie IDs', async () => {
    const movie_id1 = '60b9f1b8fbed7c002b0de1f2';
    const movie_id2 = '60b9f1b8fbed7c002b0de1f3';
    await new Genre({ name: 'Action', movie_id: movie_id1 }).save();
    await new Genre({ name: 'Comedy', movie_id: movie_id1 }).save();
    await new Genre({ name: 'Drama', movie_id: movie_id2 }).save();

    const counts = await genreService.countGenresByMoviesId([movie_id1, movie_id2]);

    expect(counts[movie_id1]).to.equal(2);
    expect(counts[movie_id2]).to.equal(1);
  });
});