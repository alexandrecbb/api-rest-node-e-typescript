import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cities - Create', () => {

    let accessToken = '';
    
    beforeAll(async () => {
        const email =  'creat-cities@gmail.com';
        await testServer.post('/register').send({name: 'Jorge', password: '123456', email});
        const signInRes = await testServer.post('/enter').send({password: '123456', email});
        accessToken = signInRes.body.accessToken;
    });

    it('Cria registro sem token de acesso', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar um registro com nome muito curto', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Ca' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});
