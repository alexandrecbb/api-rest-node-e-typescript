import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cities - DeleteById', () => {

    let accessToken = '';
    
    beforeAll(async () => {
        const email =  'deletebyid-cities@gmail.com';
        await testServer.post('/register').send({name: 'Jorge', password: '123456', email});
        const signInRes = await testServer.post('/enter').send({password: '123456', email});
        accessToken = signInRes.body.accessToken;
    });



    it('Tentar apaga registro sem o token de autemticação', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

        const resApagada = await testServer
            .delete(`/cities/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Apaga registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cities/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar registro que não existe', async () => {

        const res1 = await testServer
            .delete('/cities/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});