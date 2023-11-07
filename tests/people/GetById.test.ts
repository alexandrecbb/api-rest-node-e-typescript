import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCity = await testServer
            .post('/cities')
            .send({ name: 'Teste' });

        cityId = resCity.body;
    });


    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                fullName: 'Juca silva',
                email: 'jucagetbyid@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/people/${res1.body}`)
            .send();
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('fullName');
    });
    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/people/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});