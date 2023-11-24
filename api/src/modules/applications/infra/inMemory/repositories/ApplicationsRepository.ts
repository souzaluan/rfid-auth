import { ICreateApplicationDTO } from '../../../dtos/ICreateApplicationDTO'
import { IFindApplicationRequestDTO } from '../../../dtos/IFindApplicationDTO'
import { IApplication } from '../../../domain/IApplication'
import { IApplicationsRepository } from '../../../repositories/IApplicationsRepository'
import { IUser } from '../../../../users/domain/IUser'

export class ApplicationsRepository implements IApplicationsRepository {
  private applications: IApplication[] = []

  async create({
    email,
    loginUrl,
    name,
    password,
    userId,
  }: ICreateApplicationDTO) {
    const createApplicationData: IApplication = {
      id: this.applications.length.toString(),
      user: {} as IUser,
      email,
      password,
      loginUrl,
      name,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.applications.push(createApplicationData)

    return Promise.resolve(createApplicationData)
  }

  async find({ page, pageSize, userId, search }: IFindApplicationRequestDTO) {
    let result = this.applications.filter(
      (application) => application.userId === userId,
    )

    if (search) {
      result = result.filter((application) =>
        application.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    result = result.slice((page - 1) * pageSize, page * pageSize)

    return Promise.resolve({
      data: result,
      items: result.length,
      pages: Math.ceil(result.length / pageSize),
    })
  }

  async findByLoginUrl(loginUrl: string) {
    const application =
      this.applications.find((application) =>
        application.loginUrl.includes(loginUrl),
      ) ?? null

    return application
  }
}
