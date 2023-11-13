import { Router } from 'express';

import { CitiesController, PeopleController, UsersController } from '../controllers';
import { ensureAuthenticate } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Rodando!');
});

router.get('/cities', ensureAuthenticate, CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', ensureAuthenticate, CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', ensureAuthenticate, CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', ensureAuthenticate, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', ensureAuthenticate, CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/people', ensureAuthenticate, PeopleController.getAllValidation, PeopleController.getAll);
router.post('/people', ensureAuthenticate, PeopleController.createValidation, PeopleController.create);
router.get('/people/:id', ensureAuthenticate, PeopleController.getByIdValidation, PeopleController.getById);
router.put('/people/:id', ensureAuthenticate, PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete('/people/:id', ensureAuthenticate, PeopleController.deleteByIdValidation, PeopleController.deleteById);

router.post('/enter', UsersController.signInValidation, UsersController.signIn);
router.post('/register', UsersController.signUpValidation, UsersController.signUp);


export { router };