import { getRepository, Repository } from 'typeorm'
import Account from '@modules/accounts/infra/typeorm/entities/Accounts'
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository'
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO'

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>

  constructor() {
    this.ormRepository = getRepository(Account)
  }

  public async findAll(): Promise<Account[] | undefined> {
    return this.ormRepository.find()
  }

  public async findById(id: string): Promise<Account | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async getBalance(id: string): Promise<any | undefined> {
    return this.ormRepository.createQueryBuilder("accounts")
    .select(["accounts.id", "accounts.balance"])
    .where("accounts.id = :id", { id: id })
    .getOne()
  }

  public async create({ user_id, account_type, balance, withdraw_limit, flag_active }: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create({
      user_id,
      account_type,
      balance,
      withdraw_limit,
      flag_active
    })

    return this.ormRepository.save(account)
  }

  public async update(account: Account, data: object): Promise<Account> {
    return this.ormRepository.save({...account, ...data})
  }

  public async delete(id: string): Promise<any> {
    return this.ormRepository.softDelete(id)
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account)
  }
}

export default AccountsRepository
