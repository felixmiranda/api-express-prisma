import { Request, Response } from 'express'
import roleService from './role.service'

const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.create(req.body)
    return res.status(200).json(role)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(409).json({ message: err.message })
    } else {
      console.log(err)
      return res.status(500).json({ message: 'Unknow failure' })
    }
  }
}

const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const role = await roleService.getById(id)

    return res.status(200).json(role)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    } else {
      console.log(err)
      return res.status(500).json({ message: 'Unknow failure' })
    }
  }
}

export default {
  createRole,
  getRoleById,
}
