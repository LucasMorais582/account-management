import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, document, birthdate } = request.body
    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({
      name,
      document,
      birthdate,
    })

    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUser = container.resolve(UpdateUserService)
    const user = await updateUser.execute(request.params.user_id, request.body)

    return response.json(user)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService)
    const user = await deleteUser.execute(request.params.user_id)

    return response.json(user)
  }
}
