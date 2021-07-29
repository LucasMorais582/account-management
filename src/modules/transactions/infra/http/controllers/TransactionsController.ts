import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateTransactionService from '@modules/transactions/services/CreateTransactionsService'
import ListTransactionsService from '@modules/transactions/services/ListTransactionsService'

export default class TransactionsController {
  public async findByAccountId(request: Request, response: Response): Promise<Response> {
    const transactions = container.resolve(ListTransactionsService)

    return response.json(await transactions.execute(request.params.account_id))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createTransaction = container.resolve(CreateTransactionService)

    const account_id = request.params.account_id
    const { type, value } = request.body

    const transaction = await createTransaction.execute({
      account_id,
      type,
      value
    })

    return response.json(transaction)
  }
}
