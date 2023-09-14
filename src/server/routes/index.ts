import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post('/', (req, res) => {

    console.log(req.query.teste);

    return res.status( StatusCodes.ACCEPTED).json(req.body);
});


export { router };