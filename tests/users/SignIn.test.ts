import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Users - SignIn', () => {
    beforeAll(async () => {
        await testServer.post('/register').send({
            name: 'Jorge',
            password: '123456',
            email: 'jorge@gmail.com',
        });
    });

    it('Faz login', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '123456',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });
    it('Password errado', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '1234567',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Email errado', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '123456',
                email: 'jorgeeeeeee@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Formato de email inválido', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '123456',
                email: 'jorge gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Password muito pequeno', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '12',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });
    it('Não informado a password', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });
    it('Não informado email', async () => {
        const res1 = await testServer
            .post('/enter')
            .send({
                password: '123456',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
});