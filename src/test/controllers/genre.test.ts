import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import genresRouter from 'src/routers/genres';
import Genre from 'src/model/genre';
import 'src/test/setup';

const app = express();
app.use(express.json());
app.use('/api/genres', genresRouter);

describe('Genres API', () => {
  it('should get genres by movie ID', async () => {
    const movie_id = '60b9f1b8fbed7c002b0de1f2';
    await new Genre({ name: 'Action', movie_id }).save();
    await new Genre({ name: 'Comedy', movie_id }).save();

    const response = await request(app).get(`/api/genres?movie_id=${movie_id}&size=10&from=0`);

    expect(response.status).to.equal(200);
    expect(response.body.genres.length).to.equal(2);
  });

  it('should count genres by movie IDs', async () => {
    const movie_id1 = '60b9f1b8fbed7c002b0de1f2';
    const movie_id2 = '60b9f1b8fbed7c002b0de1f3';
    await new Genre({ name: 'Action', movie_id: movie_id1 }).save();
    await new Genre({ name: 'Comedy', movie_id: movie_id1 }).save();
    await new Genre({ name: 'Drama', movie_id: movie_id2 }).save();

    const response = await request(app)
      .post('/api/genres/_counts')
      .send({ movies_id: [movie_id1, movie_id2] });

    expect(response.status).to.equal(200);
    expect(response.body.counts[movie_id1]).to.equal(2);
    expect(response.body.counts[movie_id2]).to.equal(1);
  });
});