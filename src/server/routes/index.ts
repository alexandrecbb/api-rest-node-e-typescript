import { Router } from 'express';

import { CitiesController, PeopleController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Rodando!');
});

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/people', PeopleController.getAllValidation, PeopleController.getAll);
router.post('/people', PeopleController.createValidation, PeopleController.create);
router.get('/people/:id', PeopleController.getByIdValidation, PeopleController.getById);
router.put('/people/:id', PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete('/people/:id', PeopleController.deleteByIdValidation, PeopleController.deleteById);


export { router };