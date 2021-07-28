import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '../infra/typeorm/entities/Account'
import IAccountsRepository from '../repositories/IAccountsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
  account_type: string
  balance: number
  withdraw_limit: number
  flag_active: boolean
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({ user_id, account_type, balance, withdraw_limit, flag_active }: IRequest): Promise<Account> {
    const user = await this.userRepository.findById(user_id)
    if (!user) throw new AppError('User not found.')

    const checkAccountExists = await this.accountRepository.findByUserId(user_id)
    if (checkAccountExists) throw new AppError('This user already have an account.')

    const account = await this.accountRepository.create({
      user_id,
      account_type,
      balance,
      withdraw_limit,
      flag_active
    })

    return account
  }
}

export default CreateAccountService
