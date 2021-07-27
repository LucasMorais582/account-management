import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Accounts'
import IAccountsRepository from '../repositories/IAccountsRepository'

interface IRequest {
  value: number
}

@injectable()
class DepositAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string, deposit_value: IRequest): Promise<Account> {
    const account = await this.accountRepository.findById(id)
    if (!account) throw new AppError('User not found.')

    if(deposit_value.value <= 0) throw new AppError('Value invalid.')

    return this.accountRepository.update(account, { balance: account.balance + deposit_value.value })
  }
}

export default DepositAccountService
