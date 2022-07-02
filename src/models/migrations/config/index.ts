import app from '../../../app';

const env = process.env.NODE_ENV || 'development';

type Dialect = 'postgres' | 'mysql' | 'sqlite'

const dialect: Dialect = 'postgres'

module.exports = {
  [env]: {
    dialect,
    url: app.get(dialect),
    migrationStorageTableName: 'migrations',
  },
};
