import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', async (request, response) => {
  const usersRepository = new UsersRepository()
  return response.json(await usersRepository.findAll())
})

usersRouter.post('/', usersController.create)

usersRouter.get('/:user_id', async (request, response) => {
  const usersRepository = new UsersRepository()
  return response.json(await usersRepository.findById(request.params.user_id))
})

usersRouter.patch('/:user_id', usersController.update)

usersRouter.delete('/:user_id', usersController.delete)


export default usersRouter
