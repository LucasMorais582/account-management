import { getRepository, Repository } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUserRepository {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getRepository(User)
  }

  public async findAll(): Promise<[User[], number] | undefined> {
    return this.usersRepository.findAndCount()
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({id})
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    return this.usersRepository.findOne({document})
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(data)
    await this.usersRepository.save(user)

    return user
  }

  public async update(user: User, data: object): Promise<User> {
    return this.usersRepository.save({...user, ...data})
  }

  public async delete(id: string): Promise<any> {
    return this.usersRepository.softDelete(id)
  }

}

export default UsersRepository
