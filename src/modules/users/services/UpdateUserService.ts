import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(id: string, body: any): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new AppError('User not found.')

    // Impedindo que determinados dados sejam atualizados
    body.id ? body.id = user.id : ''
    body.document ? body.document = user.document : ''
    body.created_at ? body.created_at = user.created_at : ''
    body.updated_at ? body.updated_at = user.updated_at : ''
    body.deleted_at ? body.deleted_at = user.deleted_at : ''

    return this.userRepository.update(user, body)
  }
}

export default UpdateUserService
