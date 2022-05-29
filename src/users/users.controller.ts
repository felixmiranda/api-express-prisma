import { NextFunction, Request, Response } from 'express'
import HttpException from '../common/exceptions/HttpException'
import UsersService from './users.service'

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const user = await UsersService.getById(id)
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(400, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}
const getUserByDni = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dni = req.params.dni
    const user = await UsersService.getByDni(dni)
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(400, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}
const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email
    const user = await UsersService.getByEmail(email)
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(400, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const deletedUser = await UsersService.deleteById(id)
    return res.status(200).json(deletedUser)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(400, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}

export default {
  getUserById,
  getUserByDni,
  getUserByEmail,
  deleteUserById,
}
