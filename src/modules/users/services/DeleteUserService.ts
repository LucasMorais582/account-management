import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUserRepository'

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<any> {
    const checkUserExists = await this.userRepository.findById(id)
    if (!checkUserExists) throw new AppError('User not found.')

    return this.userRepository.delete(id)
  }
}

export default DeleteUserService
