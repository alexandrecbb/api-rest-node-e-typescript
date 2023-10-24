import * as yup from 'yup';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CitiesProvider } from '../../database/providers/cities';
import { validation } from '../../shared/middleware';
import { ICity } from '../../database/models';

interface IBodyProps extends Omit<ICity, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3).max(150),      
    })),
    
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

    const result = await CitiesProvider.create(req.body);

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            { errors: { 
                default: result.message } 
            }
        );
    }

    return res.status(StatusCodes.CREATED).json(result);

};