import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let deleteUser: DeleteUserService

let usersRepository: IUsersRepository

describe('DeleteUser', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    deleteUser = new DeleteUserService(usersRepository)
  })

  it('should be able to delete a user', async () => {
    let responseCreateUser = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseDeleteUser = await Axios.delete(`http://localhost:3333/users/${responseCreateUser.id}`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseDeleteUser.affected).toBe(1)
  })

  it('not should be able to delete a user non existing', async () => {
    let responseDeleteUser = await Axios.delete(`http://localhost:3333/users/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseDeleteUser.response.status).toBe(400)
  })

})
