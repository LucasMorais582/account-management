import { getRepository, Repository } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/Users'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAll(): Promise<[User[], number] | undefined> {
    return this.ormRepository.findAndCount()
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    return this.ormRepository.findOne({document})
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)

    return user
  }

  public async update(user: User, data: object): Promise<User> {
    return this.ormRepository.save({...user, ...data})
  }

  public async delete(id: string): Promise<any> {
    return this.ormRepository.softDelete(id)
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
