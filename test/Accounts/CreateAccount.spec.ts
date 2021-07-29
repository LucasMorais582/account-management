import AppError from '@shared/errors/AppError';
import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import IAccountsRepository  from '@modules/accounts/repositories/IAccountsRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let createAccount: CreateAccountService

let accountsRepository: IAccountsRepository
let usersRepository: IUsersRepository

describe('CreateAccount', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    createAccount = new CreateAccountService(accountsRepository, usersRepository)
  })

  it('should be able to create a new account', async () => {

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

    expect(responseCreateAccount).toHaveProperty('id')
  })

  it('not should be able to create a new account with same user_id', async () => {

    let responseCreateUser = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    await Axios.post(`http://localhost:3333/accounts`, {
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

    let responseCreateAccountRepeated = await Axios.post(`http://localhost:3333/accounts`, {
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

    expect(responseCreateAccountRepeated.response.status).toBe(400)
  })

  it('not should be able to create a new account with user_id non existing', async () => {
    let responseCreateAccountRepeated = await Axios.post(`http://localhost:3333/accounts`, {
      account_type: 'checking_account',
      balance: 10000,
      flag_active: true,
      user_id: "b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f",
      withdraw_limit: 1000
    }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseCreateAccountRepeated.response.status).toBe(400)
  })
})
