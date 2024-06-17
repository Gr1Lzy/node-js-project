import { connect, closeDatabase, clearDatabase } from 'src/test/mongoSetup';

before(async function() {
  this.timeout(30000);
  await connect();
});

after(async () => await closeDatabase());
afterEach(async () => await clearDatabase());
