import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/Users';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(id: string, body: object): Promise<User> {
    const checkUserExists = await this.userRepository.findById(id)
    if (!checkUserExists) throw new AppError('User not found.')

    return this.userRepository.update(checkUserExists, body)
  }
}

export default UpdateUserService
