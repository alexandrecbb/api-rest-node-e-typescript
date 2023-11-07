import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('people - Create', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const resCity = await testServer
            .post('/cities')
            .send({ name: 'Teste' });

        cityId = resCity.body;
    });


    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'juca@gmail.com',
                fullName: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cadastra registro 2', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                fullName: 'Juca silva',
                email: 'juca2@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com email duplicado', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                fullName: 'Juca silva',
                email: 'jucaduplicado@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/people')
            .send({
                cityId,
                fullname: 'duplicado',
                email: 'jucaduplicado@gmail.com',
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it('Tenta criar registro com fullName muito curto', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'juca@gmail.com',
                fullName: 'Ju',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.fullName');
    });

    it('Tenta criar registro sem fullName', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'juca@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.fullName');
    });

    it('Tenta criar registro sem email', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                fullName: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro com email inválido', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'juca gmail.com',
                nomeCompleto: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro sem cityId', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                email: 'juca@gmail.com',
                fulName: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cityId');
    });

    it('Tenta criar registro com cityId inválido', async () => {
        const res1 = await testServer
            .post('/people')
            .send({
                cityId: 'teste',
                email: 'juca@gmail.com',
                fullName: 'Juca da Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cityId');
    });
    
    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/people')
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cityId');
        expect(res1.body).toHaveProperty('errors.body.fullName');
    });
});