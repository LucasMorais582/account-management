import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import moment from 'moment'

@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  public async execute(account_id: string, date_init?: string, date_end?: string): Promise<Transaction[] | undefined> {
    const account = await this.accountsRepository.findById(account_id)
    if (!account) throw new AppError('Account not found.')

    let date_final
    date_end ? date_final = date_end : date_final = moment().add(1, 'days').format('YYYY-MM-DD')

    if(date_init){
      let difference = moment(date_final).diff(date_init, 'days')
      if(difference < 0) throw new AppError('Invalid dates.')
      else if(difference == 0) date_final = moment(date_init).add(1, 'days').format('YYYY-MM-DD')

      return this.transactionsRepository.findByPeriod(account_id, date_init, date_final)
    } else {
      return this.transactionsRepository.findByAccountId(account_id)
    }
  }
}

export default ListTransactionService;
