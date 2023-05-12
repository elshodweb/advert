import knex from 'knex';
import knexFile from '../../../knexfile';

export const databaseProvider = {
  provide: 'KnexConnection',
  useFactory: async () => {
    const knexConfig = knexFile;
    return knex(knexConfig[process.env.NODE_ENV]);
  },
};
