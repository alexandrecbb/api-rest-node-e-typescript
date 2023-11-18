import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

    let accessToken = '';

    beforeAll(async () => {
        const email = 'updatebyid-people@gmail.com';
        await testServer.post('/register').send({ name: 'Jorge', password: '123456', email });
        const signInRes = await testServer.post('/enter').send({ password: '123456', email });
        accessToken = signInRes.body.accessToken;
    });

    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCity = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Teste' });

        cityId = resCity.body;
    });


    it('Tenta atualizar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .put('/people/1')
            .send({
                cidadeId: 1,
                email: 'juca@gmail.com',
                nomeCompleto: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                fullName: 'Juca silva',
                email: 'jucaupdate@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/people/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                fullName: 'Juca da silva',
                email: 'jucaupdate@gmail.com',
            });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {
        const res1 = await testServer
            .put('/people/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                email: 'juca@gmail.com',
                fullName: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});