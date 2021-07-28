import { getRepository, Repository } from 'typeorm'
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction'
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository'
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO'

class TransactionsRepository implements ITransactionsRepository {
  private transactionRepository: Repository<Transaction>

  constructor() {
    this.transactionRepository = getRepository(Transaction)
  }

  public async findByAccountId(account_id: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { account_id }})
  }

  public async findByPeriod(account_id: string, date_init: string, date_end?: string): Promise<Transaction[] | undefined>{
    return this.transactionRepository.createQueryBuilder("transactions")
    .select("transactions")
    .where("transactions.account_id = :account_id", { account_id })
    .andWhere("transactions.created_at between :date_init and :date_end", { date_init, date_end })
    .getMany()
  }

  public async findByPeriodAndType(account_id: string, type: string, date_init: string, date_end?: string): Promise<Transaction[] | undefined>{
    return this.transactionRepository.createQueryBuilder("transactions")
      .select("transactions")
      .where("transactions.account_id = :account_id", { account_id })
      .andWhere("transactions.type = :type", { type })
      .andWhere("transactions.created_at between :date_init and :date_end", { date_init, date_end })
      .getMany()
  }

  public async create({
    account_id,
    type,
    value
    }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.transactionRepository.create({ account_id, type, value })
    await this.transactionRepository.save(transaction)

    return transaction
  }
}

export default TransactionsRepository
