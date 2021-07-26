import User from '../infra/typeorm/entities/Users'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUserRepository {
  findAll(): Promise<[User[], number] | undefined>
  findById(id: string): Promise<User | undefined>
  findByDocument(document: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  update(user: User, data: object): Promise<User>
  save(user: User): Promise<User>
  delete(id: string): Promise<string | void>
}
