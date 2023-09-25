import { Router } from 'express';

import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Rodando!');
});

router.post('/cities', CitiesController.createValidation, CitiesController.create);


export { router };