import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { IApplicationsRepository } from '../../../repositories/IApplicationsRepository'
import { IApplication } from '../../../domain/IApplication'
import { getRepository } from '../../../../../infra/typeorm/helpers/connection'
import { ApplicationEntity } from '../entities/Application'
import { ICreateApplicationDTO } from 'modules/applications/dtos/ICreateApplicationDTO'
import { IFindApplicationRequestDTO } from 'modules/applications/dtos/IFindApplicationDTO'

export class ApplicationsRepository implements IApplicationsRepository {
  private repository: Repository<IApplication>

  constructor() {
    this.repository = getRepository(ApplicationEntity)
  }

  async create(data: ICreateApplicationDTO) {
    const createdApplication = this.repository.create(data)

    return this.repository.save(createdApplication)
  }

  async findByLoginUrl(loginUrl: string) {
    return this.repository.findOneBy({ loginUrl })
  }

  async find({ page, pageSize, userId, search }: IFindApplicationRequestDTO) {
    const and: FindOptionsWhere<IApplication> = { userId }

    if (search) {
      and.name = ILike(`%${search}%`)
    }

    const ignoreItemsLength = (page - 1) * pageSize

    const [data, items] = await this.repository.findAndCount({
      where: and,
      order: {
        createdAt: 'DESC',
      },
      skip: ignoreItemsLength,
      take: pageSize,
    })

    const pages = Math.ceil(items / pageSize)

    return {
      data,
      pages,
      items,
    }
  }
}
