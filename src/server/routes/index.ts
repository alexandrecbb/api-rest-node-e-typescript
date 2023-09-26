import { Router } from 'express';

import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Rodando!');
});

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.get('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.getById);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);


export { router };