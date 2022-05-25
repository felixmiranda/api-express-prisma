import { Request, Response } from "express"
import UsersService from "./users.service"

const UsersController = {
    createUser: async(req: Request, res: Response) => {
        const user = await UsersService.create(req.body)
        return res.status(200).json(user);
    },
    getUserById: async(req: Request, res: Response) => {
        const id = Number(req.params.id)
        const user = await UsersService.getById(id)
        return res.status(200).json(user);
    },
    getUserByDni: async(req: Request, res: Response) => {
        const dni = req.params.dni
        const user = await UsersService.getByDni(dni)
        return res.status(200).json(user);
    },
    getUserByEmail: async(req: Request, res: Response) => {
        const email = req.params.email
        const user = await UsersService.getByEmail(email)
        return res.status(200).json(user);
    }
}

export default UsersController