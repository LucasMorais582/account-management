import { Router } from 'express'
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'
import AccountsController from '../controllers/AccountsController'

const accountsRouter = Router()
const accountsController = new AccountsController()

accountsRouter.get('/', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  return response.json(await accountsRepository.findAll())
})

accountsRouter.get('/:account_id', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  return response.json(await accountsRepository.findById(request.params.account_id))
})

accountsRouter.post('/', accountsController.create)

accountsRouter.get('/:account_id/balance', async (request, response) => {
  const accountsRepository = new AccountsRepository()
  return response.json(await accountsRepository.getBalance(request.params.account_id))
})

// accountsRouter.patch('/:account_id/withdraw-account', accountsController.withdrawAccount)

accountsRouter.patch('/:account_id/deposit-account', accountsController.depositAccount)

accountsRouter.patch('/:account_id/block-account', accountsController.updateFlagActive)

accountsRouter.patch('/:account_id', accountsController.update)

accountsRouter.delete('/:account_id', accountsController.delete)

export default accountsRouter
