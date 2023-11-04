import { ICity } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        city: ICity
        person: IPerson
        //users: IUsers
    }
}