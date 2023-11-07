import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - DeleteById', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCity = await testServer
            .post('/cities')
            .send({ name: 'Teste' });

        cityId = resCity.body;
    });


    it('Apaga registro', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'jucadelete@gmail.com',
                fullName: 'Juca silva',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/people/${res1.body}`)
            .send();
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta apagar registro que não existe', async () => {
        const res1 = await testServer
            .delete('/people/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});