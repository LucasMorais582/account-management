import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';


@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  public async execute(account_id: string): Promise<Transaction[]> {
    const account = await this.accountsRepository.findById(account_id)
    if (!account) throw new AppError('Account not found.');

    return this.transactionsRepository.findByAccountId(account_id)
  }
}

export default ListTransactionService;
