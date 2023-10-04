import { knex } from 'knex';

import { development, production, test } from './Environment';

const geEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return development;
        case 'production':
            return production;
        case 'test':
            return test;
        default:
            return development;
    }
};

export const Knex = knex(geEnvironment());