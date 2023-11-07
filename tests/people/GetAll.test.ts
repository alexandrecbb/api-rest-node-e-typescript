import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('People - GetAll', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCity = await testServer
            .post('/cities')
            .send({ name: 'Teste' });

        cityId = resCity.body;
    });


    it('Busca registros', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'jucagetall@gmail.com',
                fullName: 'Juca silva',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/people')
            .send();
        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});