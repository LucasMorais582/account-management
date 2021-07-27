import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Accounts'
import IAccountsRepository from '../repositories/IAccountsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

@injectable()
class UpdateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string, body: object): Promise<Account> {
    const account = await this.accountRepository.findById(id)
    if (!account) throw new AppError('User not found.')

    return this.accountRepository.update(account, body)
  }
}

export default UpdateAccountService
