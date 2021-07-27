import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Accounts'
import IAccountsRepository from '../repositories/IAccountsRepository'

@injectable()
class WithdrawAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string, withdraw_value: number): Promise<Account> {
    const account = await this.accountRepository.findById(id)
    if (!account) throw new AppError('User not found.')

    //TO DO
    // Buscar as transações do dia
    // Limite de saque - (saques do dia + saque requerido)
    // if < 0 Error

    return this.accountRepository.update(account, { balance: 1 })
  }
}

export default WithdrawAccountService
