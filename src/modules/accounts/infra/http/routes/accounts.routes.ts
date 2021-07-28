import { Router } from 'express'
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'
import AccountsController from '../controllers/AccountsController'
import AppError from '@shared/errors/AppError'

const accountsRouter = Router()
const accountsController = new AccountsController()

accountsRouter.get('/', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  return response.json(await accountsRepository.findAll())
})

accountsRouter.get('/:account_id', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  const account = await accountsRepository.findById(request.params.account_id)
  if(!account) throw new AppError("Account not found.")

  return response.json(account)
})

accountsRouter.post('/', accountsController.create)

accountsRouter.get('/:account_id/balance', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  const account = await accountsRepository.findByIdAndGetBalance(request.params.account_id)
  if(!account) throw new AppError("Account not found.")

  return response.json(account)
})

accountsRouter.patch('/:account_id/block-account', accountsController.updateFlagActive)

accountsRouter.patch('/:account_id', accountsController.update)

accountsRouter.delete('/:account_id', accountsController.delete)

export default accountsRouter
