import { inject, injectable } from 'tsyringe'
import { IApplicationsRepository } from '../repositories/IApplicationsRepository'
import { ICreateApplicationDTO } from '../dtos/ICreateApplicationDTO'
import { IApplication } from '../domain/IApplication'
import { CryptoStrategy } from '../helpers/CryptoStrategy'

@injectable()
export class CreateApplicationService {
  constructor(
    @inject('ApplicationsRepository')
    private applicationsRepository: IApplicationsRepository,
  ) {}

  async execute({
    name,
    loginUrl,
    email,
    password,
    userId,
  }: ICreateApplicationDTO): Promise<IApplication> {
    const encryptedPassword = CryptoStrategy.encrypt(password)

    const createdApplication = await this.applicationsRepository.create({
      name,
      loginUrl,
      email,
      password: encryptedPassword,
      userId,
    })

    return createdApplication
  }
}
