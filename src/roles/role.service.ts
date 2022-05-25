import prismaService from '../common/services/prisma.service'
import { ICreateRoleDto } from './dto/createRole.dto'

const create = async (role: ICreateRoleDto) => {
  return prismaService.role.create({
    data: {
      ...role,
    },
  })
}

const getById = async (id: number) => {
  const role = prismaService.role.findUnique({
    where: {
      id,
    },
  })

  if (!role) {
    throw new Error('Error while reading a role by id')
  }

  return role
}

export default {
  create,
  getById,
}
