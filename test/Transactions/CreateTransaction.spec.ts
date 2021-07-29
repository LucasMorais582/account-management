import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService'
import IAccountsRepository  from '@modules/accounts/repositories/IAccountsRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import CreateTransactionService from '@modules/transactions/services/CreateTransactionsService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'
import ITransactionsRepository  from '@modules/transactions/repositories/ITransactionsRepository'


import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

enum TypesTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

let createUser: CreateUserService
let createAccount: CreateAccountService
let updateAccount: UpdateAccountService
let createTransaction: CreateTransactionService

let accountsRepository: IAccountsRepository
let usersRepository: IUsersRepository
let transactionsRepository: ITransactionsRepository

describe('CreateTransaction', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    createAccount = new CreateAccountService(accountsRepository, usersRepository)
    updateAccount = new UpdateAccountService(accountsRepository)
    createTransaction = new CreateTransactionService(transactionsRepository, accountsRepository)
  })

  it('should be able to create a deposit account', async () => {
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

    let responseCreateTransaction = await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseCreateTransaction.balance).toBe(10200)
  })

  it('should be able to create a withdraw account', async () => {
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

    let responseCreateTransaction = await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/withdraw-account`,
     { account_id: responseCreateAccount.id, type: TypesTransaction.WITHDRAW, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseCreateTransaction.balance).toBe(9800)
  })

  it('not should be able to create a withdrawal bigger than withdraw limit', async () => {
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

    let responseCreateTransaction = await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/withdraw-account`,
     { type: TypesTransaction.WITHDRAW, value: 2000 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseCreateTransaction.response.status).toBe(400)
  })

  it('not should be able to create a new transaction with account_id non existing', async () => {
    let responseCreateTransaction = await Axios.post(`http://localhost:3333/transactions/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f/withdraw-account`,
    { type: TypesTransaction.WITHDRAW, value: 2000 }, {
     headers: {
         Accept: 'application/json'
     },
    }).then(res => res.data).catch(err => err)

    expect(responseCreateTransaction.response.status).toBe(400)
  })
})
