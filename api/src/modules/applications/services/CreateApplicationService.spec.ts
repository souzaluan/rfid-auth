import 'dotenv/config'

import { IApplicationsRepository } from '../repositories/IApplicationsRepository'
import { ApplicationsRepository } from '../infra/inMemory/repositories/ApplicationsRepository'
import { CreateApplicationService } from './CreateApplicationService'

let applicationsRepository: IApplicationsRepository
let sut: CreateApplicationService

describe('Create Application Service', () => {
  beforeEach(() => {
    applicationsRepository = new ApplicationsRepository()
    sut = new CreateApplicationService(applicationsRepository)
  })

  it('should be possible create application', async () => {
    const response = await sut.execute({
      name: 'any application',
      email: 'any@email.com',
      password: 'any password',
      loginUrl: 'https://any.lorem',
      userId: 'user-id',
    })

    expect(response.name).toBe('any application')
  })

  it('should encrypt application password', async () => {
    const response = await sut.execute({
      name: 'any application',
      email: 'any@email.com',
      password: 'any password',
      loginUrl: 'https://any.lorem',
      userId: 'user-id',
    })

    expect(response.password).not.toEqual('any password')
  })
})
