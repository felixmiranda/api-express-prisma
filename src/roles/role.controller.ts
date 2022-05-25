import { Request, Response } from "express"
import RoleService from "./role.service"

const RoleController = {
    createRole: async(req: Request, res: Response) => {
        const role = await RoleService.create(req.body)
        return res.status(200).json(role);
    },
    getRoleById: async(req: Request, res: Response) => {
        const id = Number(req.params.id)
        const role = await RoleService.getById(id)
        return res.status(200).json(role);
    },
}

export default RoleController