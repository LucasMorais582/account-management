import AppError from '@shared/errors/AppError';
import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import DeleteAccountService from '@modules/accounts/services/DeleteAccountService'
import IAccountsRepository  from '@modules/accounts/repositories/IAccountsRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let createAccount: CreateAccountService
let deleteAccount: DeleteAccountService

let accountsRepository: IAccountsRepository
let usersRepository: IUsersRepository

describe('DeleteAccount', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    createAccount = new CreateAccountService(accountsRepository, usersRepository)
    deleteAccount = new DeleteAccountService(accountsRepository)
  })

  it('should be able to delete an account', async () => {
    let responseCreateUser = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseCreateAccount = await Axios.post(`http://localhost:3333/accounts`, {
      account_type: 'checking_account',
      balance: 10000,
      flag_active: true,
      user_id: responseCreateUser.id,
      withdraw_limit: 1000
      }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseDeleteAccount = await Axios.delete(`http://localhost:3333/accounts/${responseCreateAccount.id}`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseDeleteAccount.affected).toBe(1)
  })

  it('not should be able to delete an account non existing', async () => {
    let responseDeleteAccount = await Axios.delete(`http://localhost:3333/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseDeleteAccount.response.status).toBe(400)
  })
})
