import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let updateUser: UpdateUserService

let usersRepository: IUsersRepository

describe('UpdateUser', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
    updateUser = new UpdateUserService(usersRepository)
  })

  it('should be able to update a user', async () => {
    let responseCreateUser = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    let responseUpdateUser = await Axios.patch(`http://localhost:3333/users/${responseCreateUser.id}`, { name: "Hugo Meireles" }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseUpdateUser.name).toBe('Hugo Meireles')
  })

  it('not should be able to update a user non existing', async () => {
    let responseUpdateUser = await Axios.patch(`http://localhost:3333/users/b5a5d25c-d4fd-4f1a-9f49-4a51630fa48f`, { name: "Hugo Meireles" }, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    expect(responseUpdateUser.response.status).toBe(400)
  })
})
