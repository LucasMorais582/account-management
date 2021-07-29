import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService'
import IAccountsRepository  from '@modules/accounts/repositories/IAccountsRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import CreateTransactionService from '@modules/transactions/services/CreateTransactionsService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'
import ITransactionsRepository  from '@modules/transactions/repositories/ITransactionsRepository'

import moment from 'moment'
import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

enum TypesTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

describe('ListTransaction', () => {
  it('should be able to list a transactions account', async () => {
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

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseListTransactions = await Axios.get(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseListTransactions).toHaveLength(3)
  })

  it('not should be able to list a transactions account with account_id non existing', async () => {
    let responseListTransactions = await Axios.get(`http://localhost:3333/transactions/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseListTransactions.response.status).toBe(400)
  })

  it('should be able to list a transactions account into a period of time', async () => {
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

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    await Axios.post(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/deposit-account`,
     { type: TypesTransaction.DEPOSIT, value: 200 }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseListTransactions = await Axios.get(`http://localhost:3333/transactions/accounts/${responseCreateAccount.id}/period`,
    { params: { date_init: moment().format('YYYY-MM-DD') },
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseListTransactions).toHaveLength(3)
  })

  it('not should be able to list a transactions account into a period of time with account_id non existing', async () => {
    let responseListTransactions = await Axios.get(`http://localhost:3333/transactions/accounts/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f/period`,
      { params: { date_init: moment().format('YYYY-MM-DD') },
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseListTransactions.response.status).toBe(400)
  })
})
