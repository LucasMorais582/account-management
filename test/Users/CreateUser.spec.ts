import CreateUserService from '@modules/users/services/CreateUserService'
import IUsersRepository  from '@modules/users/repositories/IUsersRepository'

import Axios from 'axios'
import { generate } from 'gerador-validador-cpf'

let createUser: CreateUserService
let usersRepository: IUsersRepository

describe('CreateUser', () => {
  beforeEach(() => {
    createUser = new CreateUserService(usersRepository)
  })

  it('should be able to create a new user', async () => {

    let responseCreateUser = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)
    expect(responseCreateUser).toHaveProperty('id')
  })

  it('not should be able to create a new user with same document another', async () => {
    const user = await Axios.post(`http://localhost:3333/users`, {
      name: "Hugo",
      document: generate(),
      birthdate: new Date()}, {
      headers: {
          Accept: 'application/json'
      },
    }).then(res => res.data).catch(err => err)

    const userRepeated = await Axios.post(`http://localhost:3333/users`, {
        name: "Hugo",
        document: user.document,
        birthdate: new Date()}, {
        headers: {
            Accept: 'application/json'
        },
      }).then(res => res.data).catch(err => err)

    expect(userRepeated.response.status).toBe(400)
  })
})
