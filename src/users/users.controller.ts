import { Request, Response } from 'express'
import UsersService from './users.service'

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const user = await UsersService.getById(id)
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    } else {
      console.log(err)
      return res.status(500).json({ message: 'Unknow failure' })
    }
  }
}
const getUserByDni = async (req: Request, res: Response) => {
  try {
    const dni = req.params.dni
    const user = await UsersService.getByDni(dni)
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    } else {
      console.log(err)
      return res.status(500).json({ message: 'Unknow failure' })
    }
  }
}
const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email
    const user = await UsersService.getByEmail(email)
    return res.status(200).json(user)
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
  getUserById,
  getUserByDni,
  getUserByEmail,
}
