import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('People - GetAll', () => {


    let accessToken = '';

    beforeAll(async () => {
        const email = 'getall-people@gmail.com';
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
            .get('/people')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it('Busca registros', async () => {
        const res1 = await testServer
            .post('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                email: 'jucagetall@gmail.com',
                fullName: 'Juca silva',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});