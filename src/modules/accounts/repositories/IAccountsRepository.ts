import Account from '../infra/typeorm/entities/Account'
import ICreateAccountDTO from '../dtos/ICreateAccountDTO'

export default interface IAccountsRepository {
  findAll(): Promise<Account[] | undefined>
  findById(id: string): Promise<Account | undefined>
  findByUserId(user_id: string): Promise<Account | undefined>
  findByIdAndGetBalance(id: string): Promise<any | undefined>
  create(data: ICreateAccountDTO): Promise<Account>
  update(account: Account, data: object): Promise<Account>
  delete(id: string): Promise<any>
}
