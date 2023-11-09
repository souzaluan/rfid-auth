import { EntityTarget, ObjectLiteral } from 'typeorm'

import { instance } from '..'

export const getRepository = (entity: EntityTarget<ObjectLiteral>) => {
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
