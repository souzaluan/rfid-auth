import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'

import { instance } from '..'

export const getRepository = <Entity extends ObjectLiteral>(
  entity: EntityTarget<Entity>,
): Repository<Entity> => {
  const repository = instance.getRepository(entity)

  return repository
}

export const connectDb = async (callback: () => void) => {
  return instance
    .initialize()
    .then(() => {
      console.log('Database connected successfully')

      return callback()
    })
    .catch((error) => {
      return console.log('Error during database connection => ' + error)
    })
}
