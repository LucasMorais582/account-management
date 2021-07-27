import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/Users'

interface IRequest {
  name: string
  document: string
  birthdate: Date
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({ name, document, birthdate }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByDocument(document)
    if (checkUserExists) throw new AppError('Email address is already used.')

    const user = await this.userRepository.create({
      name,
      document,
      birthdate,
    })

    return user
  }
}

export default CreateUserService
