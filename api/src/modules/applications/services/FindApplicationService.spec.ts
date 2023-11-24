import { ApplicationsRepository } from '../infra/inMemory/repositories/ApplicationsRepository'
import { IApplicationsRepository } from '../repositories/IApplicationsRepository'
import { FindApplicationService } from './FindApplicationService'

let applicationsRepository: IApplicationsRepository
let sut: FindApplicationService

describe('Find Application Service', () => {
  beforeEach(() => {
    applicationsRepository = new ApplicationsRepository()
    sut = new FindApplicationService(applicationsRepository)
  })

  it('should be possible find application', async () => {
    for (let index = 0; index < 12; index++) {
      await applicationsRepository.create({
        email: 'any-email',
        loginUrl: 'any-url',
        password: 'any-password',
        name: `application#${index}`,
        userId: 'user-id',
      })
    }

    const applications = await sut.execute({
      page: 2,
      pageSize: 10,
      userId: 'user-id',
    })

    expect(applications.data).toHaveLength(2)
    expect(applications.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '10',
          name: 'application#10',
        }),
        expect.objectContaining({
          id: '11',
          name: 'application#11',
        }),
      ]),
    )
  })

  it("should be possible just user's application", async () => {
    for (let index = 0; index < 5; index++) {
      await applicationsRepository.create({
        userId: `user-id-${index}`,
        email: 'any-email',
        loginUrl: 'any-url',
        password: 'any-password',
        name: `application#${index}`,
      })
    }

    const applications = await sut.execute({
      page: 1,
      pageSize: 10,
      userId: 'user-id-1',
    })

    expect(applications.data).toHaveLength(1)
    expect(applications.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1',
          name: 'application#1',
        }),
      ]),
    )
  })

  it('should be possible find application searching by name', async () => {
    for (let index = 0; index < 5; index++) {
      await applicationsRepository.create({
        email: 'any-email',
        loginUrl: 'any-url',
        password: 'any-password',
        name: `application#${index}`,
        userId: 'user-id',
      })
    }

    const applications = await sut.execute({
      page: 1,
      pageSize: 10,
      userId: 'user-id',
      search: 'application#4',
    })

    expect(applications.data).toHaveLength(1)
    expect(applications.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '4',
          name: 'application#4',
        }),
      ]),
    )
  })
})
