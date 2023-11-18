import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cities - GetAll', () => {

    let accessToken = '';
    
    beforeAll(async () => {
        const email =  'getall-cities@gmail.com';
        await testServer.post('/register').send({name: 'Jorge', password: '123456', email});
        const signInRes = await testServer.post('/enter').send({password: '123456', email});
        accessToken = signInRes.body.accessToken;
    });

    it('Buscar todos os registros sem o token de  autenticação', async () => {

        const res1 = await testServer
            .get('/cities')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});