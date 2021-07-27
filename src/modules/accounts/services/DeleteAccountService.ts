import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IAccountsRepository from '../repositories/IAccountsRepository'

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string): Promise<any> {
    const checkUserExists = await this.accountRepository.findById(id)
    if (!checkUserExists) throw new AppError('User not found.')

    return this.accountRepository.delete(id)
  }
}

export default CreateAccountService
