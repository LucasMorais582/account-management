import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Account'
import IAccountsRepository from '../repositories/IAccountsRepository'

@injectable()
class UpdateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository
  ) {}

  public async execute(id: string, body: any): Promise<Account> {
    const account = await this.accountRepository.findById(id)
    if (!account) throw new AppError('User not found.')

    // Impedindo que determinados dados sejam atualizados
    body.id ? body.id = account.id : ''
    body.user_id ? body.user_id = account.user_id : ''
    body.created_at ? body.created_at = account.created_at : ''
    body.updated_at ? body.updated_at = account.updated_at : ''
    body.deleted_at ? body.deleted_at = account.deleted_at : ''

    return this.accountRepository.update(account, body)
  }
}

export default UpdateAccountService
