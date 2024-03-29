import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/HttpException'

const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500
  const message = error.message || 'Unknow failure'
  response.status(status).send({
    message,
    status,
  })
}

export default errorMiddleware
