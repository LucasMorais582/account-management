import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import '../typeorm'
import '@shared/container'
import AppError from '../../errors/AppError'

const app = express()
app.use(express.json())

app.use(routes)
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError)
      return response.status(error.statusCode).json({
        status: 'Error',
        message: error.message,
      })

    console.error(error)

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error.',
    })
  }
)

app.listen(3333, () => {
  console.log('Server started with success')
})
