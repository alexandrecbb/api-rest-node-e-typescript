import supertest from 'supertest';
import { server } from '../src/server/Sever';
import { Knex } from '../src/server/database/knex';

beforeAll( async () => {
    await Knex.migrate.latest();
    await Knex.seed.run();
});

afterAll( async () => {
    await Knex.destroy();
});

export const testServer = supertest(server);