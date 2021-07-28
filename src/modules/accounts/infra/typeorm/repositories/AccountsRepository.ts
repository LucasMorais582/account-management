import { getRepository, Repository } from 'typeorm'
import Account from '@modules/accounts/infra/typeorm/entities/Account'
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository'
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO'

class AccountsRepository implements IAccountsRepository {
  private accountsRepository: Repository<Account>

  constructor() {
    this.accountsRepository = getRepository(Account)
  }

  public async findAll(): Promise<Account[] | undefined> {
    return this.accountsRepository.find()
  }

  public async findById(id: string): Promise<Account | undefined> {
    return this.accountsRepository.findOne(id)
  }

  public async findByUserId(user_id: string): Promise<Account | undefined> {
    return this.accountsRepository.findOne({where: { user_id }})
  }

  public async findByIdAndGetBalance(id: string): Promise<any | undefined> {
    return this.accountsRepository.createQueryBuilder("accounts")
      .select(["accounts.id", "accounts.balance"])
      .where("accounts.id = :id", { id: id })
      .getOne()
  }

  public async create({ user_id, account_type, balance, withdraw_limit, flag_active }: ICreateAccountDTO): Promise<Account> {
    const account = this.accountsRepository.create({
      user_id,
      account_type,
      balance,
      withdraw_limit,
      flag_active
    })

    return this.accountsRepository.save(account)
  }

  public async update(account: Account, data: object): Promise<Account> {
    return this.accountsRepository.save({...account, ...data})
  }

  public async delete(id: string): Promise<any> {
    return this.accountsRepository.softDelete(id)
  }

}

export default AccountsRepository
