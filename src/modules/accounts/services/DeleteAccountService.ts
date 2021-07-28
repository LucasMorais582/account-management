import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IAccountsRepository from '../repositories/IAccountsRepository'

@injectable()
class DeleteAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string): Promise<any> {
    const checkAccountExists = await this.accountRepository.findById(id)
    if (!checkAccountExists) throw new AppError('Account not found.')

    return this.accountRepository.delete(id)
  }
}

export default DeleteAccountService
