import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Account from '@modules/accounts/infra/typeorm/entities/Account'
import ITransactionsRepository from '../repositories/ITransactionsRepository'
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository'

import moment from 'moment'

enum TypesTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

interface IRequest {
  account_id: string
  type: TypesTransaction
  value: number
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  public async execute({ account_id, type, value }: IRequest): Promise<Account | undefined> {
    const account = await this.accountsRepository.findById(account_id)
    if (!account) throw new AppError('Account not found.')

    let account_updated

    if(type === TypesTransaction.DEPOSIT){
      let transaction = await this.transactionsRepository.create({ account_id, type, value })
      if(transaction.id){
        account_updated = this.accountsRepository.update(account, {balance: account.balance + Math.abs(value) })
      } else {
        throw new AppError('Transaction not created.')
      }

    } else if(type === TypesTransaction.WITHDRAW){
        let dayWithdrawValue = 0
        let today = moment().format("YYYY-MM-DD")
        let date_end = moment(today).add(1).format("YYYY-MM-DD")
        let allTransactions = await this.transactionsRepository.findByPeriodAndType(account.id, TypesTransaction.WITHDRAW, today, date_end)

        if(!allTransactions){
          let transaction = await this.transactionsRepository.create({ account_id, type, value })
          if(transaction.id){
            account_updated = this.accountsRepository.update(account, {balance: account.balance - Math.abs(value) })
          } else {
            throw new AppError('Transaction not created.')
          }

        } else {
            allTransactions?.forEach(index =>{
              dayWithdrawValue += index.value
            })

            if(dayWithdrawValue + value > account.withdraw_limit) throw new AppError('Withdrawal limit exceeded.')
            else {
              let transaction = await this.transactionsRepository.create({ account_id, type, value })
              if(transaction.id){
                account_updated = this.accountsRepository.update(account, {balance: account.balance - Math.abs(value) })
              } else {
                throw new AppError('Transaction not created.')
              }
            }
        }
    }

    return account_updated
  }
}

export default CreateTransactionService
