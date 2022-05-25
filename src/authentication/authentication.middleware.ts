import { NextFunction, Request, Response } from 'express'
import HttpException from '../common/exceptions/HttpException'
import authenticationService from './authentication.service'

const validateBodyRequest = async (req: Request, res: Response, next: NextFunction) => {
  if ((req.body && req.body.email, req.body.password)) {
    return next()
  } else {
    return res.status(400).json({
      message: 'Mandatory fields are missing: email and password',
    })
  }
}

const verifyCredentials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authenticationService.getAuthenticatedUser(req.body.email, req.body.password)
    req.body = {
      dni: user.dni,
      email: user.email,
      role: user.roleid,
    }
    return next()
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(400, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}

export default {
    validateBodyRequest,
    verifyCredentials
}
