import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

    let accessToken = '';

    beforeAll(async () => {
        const email = 'getbyid-people@gmail.com';
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

    it('Tenta consultar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .get('/people/1')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                fullName: 'Juca silva',
                email: 'jucagetbyid@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/people/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('fullName');
    });
    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/people/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});