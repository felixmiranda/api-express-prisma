// import { IPatchUser, IPutUser, IUser, IUsersService } from '../../interfaces/user.interface';
import prismaService from '../common/services/prisma.service'
import { ICreateRoleDto } from './dto/createRole.dto'

const RoleService = {
  create: async (role: ICreateRoleDto) => {
    return prismaService.role.create({
      data: {
        ...role,
      },
    })
  },
  getById: async (id: number) => {
    const role = prismaService.role.findUnique({
      where: {
        id,
      },
    })

    if (!role) {
      throw new Error('Error while Reading Role')
    }

    return role
  },
}

export default RoleService
