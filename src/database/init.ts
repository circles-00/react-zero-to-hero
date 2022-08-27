import AppDataSource from '../../ormconfig'

export const initMigrations = async () => {
  await AppDataSource.connect()
  console.log('Running migrations')
  await AppDataSource.runMigrations({ transaction: 'all' })
}
