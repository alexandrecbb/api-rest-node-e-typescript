import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..','..','..','..','database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..','migrations')
    },
    useNullAsDefault: true,
    seeds: {
        directory: path.resolve(__dirname, '..','seeds')
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        }
    }
};
export const production: Knex.Config = {
    ...development,
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:'
};

