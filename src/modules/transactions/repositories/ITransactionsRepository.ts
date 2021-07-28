import Transaction from '../infra/typeorm/entities/Transaction'

import ICreateTransactionsDTO from '../dtos/ICreateTransactionDTO'

export default interface ITransactionsRepository {
  findByAccountId(account_id: string): Promise<Transaction[]>
  findByPeriod(account_id: string, date_init: string, date_end?: string): Promise<Transaction[] | undefined>
  findByPeriodAndType(account_id: string, type: string, date_init: string, date_end?: string): Promise<Transaction[] | undefined>
  create(data: ICreateTransactionsDTO): Promise<Transaction>
}
