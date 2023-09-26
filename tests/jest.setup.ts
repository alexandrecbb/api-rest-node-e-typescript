import supertest from 'supertest';
import { server } from '../src/server/Sever';


export const testServer = supertest(server);