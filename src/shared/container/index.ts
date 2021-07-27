import { container } from 'tsyringe'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository'


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
)
