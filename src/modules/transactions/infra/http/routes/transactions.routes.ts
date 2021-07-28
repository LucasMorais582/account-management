import { Router } from 'express'
import TransactionsController from '../controllers/TransactionsController'

const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.get('/accounts/:account_id', transactionsController.findByAccountId)

transactionsRouter.get('/accounts/:account_id/period', transactionsController.findByPeriod)

transactionsRouter.post('/accounts/:account_id/withdraw-account', transactionsController.create)

transactionsRouter.post('/accounts/:account_id/deposit-account', transactionsController.create)

export default transactionsRouter
