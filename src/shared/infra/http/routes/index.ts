import { Router, json } from 'express'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import accountsRouter from '@modules/accounts/infra/http/routes/accounts.routes'

const routes = Router()
routes.use(json())

routes.use('/users', usersRouter)
routes.use('/accounts', accountsRouter)

export default routes
