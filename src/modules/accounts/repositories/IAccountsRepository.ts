import Account from '../infra/typeorm/entities/Accounts'
import ICreateAccountDTO from '../dtos/ICreateAccountDTO'

export default interface IAccountsRepository {
  findAll(): Promise<Account[] | undefined>
  findById(id: string): Promise<Account | undefined>
  getBalance(id: string): Promise<any | undefined>
  create(data: ICreateAccountDTO): Promise<Account>
  update(account: Account, data: object): Promise<Account>
  delete(id: string): Promise<any>
  save(account: Account): Promise<Account>
}
