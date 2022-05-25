import { NextFunction, Request, Response } from 'express'
import HttpException from '../common/exceptions/HttpException'
import roleService from './role.service'

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await roleService.create(req.body)
    return res.status(200).json(role)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(409, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}

const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const role = await roleService.getById(id)

    return res.status(200).json(role)
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpException(409, err.message))
    }
    next(new HttpException(500, 'Unknow failure'))
  }
}

export default {
  createRole,
  getRoleById,
}
