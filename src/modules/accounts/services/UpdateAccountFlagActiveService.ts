import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Account'
import IAccountsRepository from '../repositories/IAccountsRepository'

@injectable()
class UpdateAccountFlagActiveService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string): Promise<Account> {
    const account = await this.accountRepository.findById(id)
    if (!account) throw new AppError('User not found.')

    return this.accountRepository.update(account, { flag_active: !account.flag_active })
  }
}

export default UpdateAccountFlagActiveService
