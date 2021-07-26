import { Router, json } from 'express'
import usersRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()
routes.use(json())

routes.use('/users', usersRouter)

export default routes
