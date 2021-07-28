import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAccountService from '@modules/accounts/services/CreateAccountService'
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService'
import UpdateAccountFlagActiveService from '@modules/accounts/services/UpdateAccountFlagActiveService'
// import WithdrawAccountService from '@modules/accounts/services/WithdrawAccountService'
// import DepositAccountService from '@modules/accounts/services/DepositAccountService'
import DeleteAccountService from '@modules/accounts/services/DeleteAccountService'

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {  user_id, account_type, balance, withdraw_limit, flag_active } = request.body
    const createAccount = container.resolve(CreateAccountService)

    const account = await createAccount.execute({
      user_id,
      account_type,
      balance,
      withdraw_limit,
      flag_active,
    })
    return response.json(account)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateAccount = container.resolve(UpdateAccountService)
    const account = await updateAccount.execute(request.params.account_id, request.body)

    return response.json(account)
  }

  public async updateFlagActive(request: Request, response: Response): Promise<Response> {
    const updateAccount = container.resolve(UpdateAccountFlagActiveService)
    const account = await updateAccount.execute(request.params.account_id)

    return response.json(account)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteaccount = container.resolve(DeleteAccountService)
    const account = await deleteaccount.execute(request.params.account_id)

    return response.json(account)
  }
}
