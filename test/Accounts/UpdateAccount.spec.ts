import AppError from '@shared/errors/AppError'
import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService'
import IAccountsRepository  from '@modules/accounts/repositories/IAccountsRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let createAccount: CreateAccountService
let updateAccount: UpdateAccountService

let accountsRepository: IAccountsRepository
let usersRepository: IUsersRepository

describe('UpdateAccount', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    createAccount = new CreateAccountService(accountsRepository, usersRepository)
    updateAccount = new UpdateAccountService(accountsRepository)
  })

  it('should be able to update an account', async () => {
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

    let responseUpdateAccount = await Axios.patch(`http://localhost:3333/accounts/${responseCreateAccount.id}`,
     { withdraw_limit: 2000 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseUpdateAccount.withdraw_limit).toBe(2000)
  })

  it('not should be able to update an account non existing', async () => {
    let responseUpdateAccount = await Axios.patch(`http://localhost:3333/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`,
     { withdraw_limit: 2000 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseUpdateAccount.response.status).toBe(400)
  })

  it('should be able to update a status account', async () => {
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

    let responseUpdateAccount = await Axios.patch(`http://localhost:3333/accounts/${responseCreateAccount.id}`, { flag_active: false }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseUpdateAccount.flag_active).toBe(false)
  })

  it('not should be able to update a status account non existing', async () => {
    let responseUpdateAccount = await Axios.patch(`http://localhost:3333/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`,
      { flag_active: false }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseUpdateAccount.response.status).toBe(400)
  })
})
