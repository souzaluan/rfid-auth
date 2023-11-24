import { inject, injectable } from 'tsyringe'
import { IApplicationsRepository } from '../repositories/IApplicationsRepository'
import {
  IFindApplicationRequestDTO,
  IFindApplicationResponseDTO,
} from '../dtos/IFindApplicationDTO'

@injectable()
export class FindApplicationService {
  constructor(
    @inject('ApplicationsRepository')
    private applicationsRepository: IApplicationsRepository,
  ) {}

  async execute({
    page,
    pageSize,
    userId,
    search,
  }: IFindApplicationRequestDTO): Promise<IFindApplicationResponseDTO> {
    const applications = await this.applicationsRepository.find({
      page,
      pageSize,
      userId,
      search,
    })

    return applications
  }
}
