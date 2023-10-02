import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cities - Create', () => {

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar um registro com nome muito curto', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Ca' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});
