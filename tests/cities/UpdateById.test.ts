import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cidades - UpdateById', () => {


    let accessToken = '';

    beforeAll(async () => {
        const email = 'updatebyid-cities@gmail.com';
        await testServer.post('/register').send({ name: 'Jorge', password: '123456', email });
        const signInRes = await testServer.post('/enter').send({ password: '123456', email });
        accessToken = signInRes.body.accessToken;
    });

    it('Tenta atualizar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .put('/cities/1')
            .send({ name: 'Teste' });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cities/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});