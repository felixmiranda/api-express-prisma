// import { IPatchUser, IPutUser, IUser, IUsersService } from '../../interfaces/user.interface';
import prismaService from '../common/services/prisma.service'
import { ICreateUserDto } from './dto/createUser.dto'

const UsersService = {
  create: async (user: ICreateUserDto) => {
    return prismaService.user.create({
      data: {
        ...user,
      },
    })
  },
  getById: async (id: number) => {
    const user = prismaService.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Error while Reading User')
    }

    return user
  },
  getByDni: async (dni: string) => {
    const user = prismaService.user.findUnique({
      where: {
        dni,
      },
    })

    if (!user) {
      throw new Error('Error while Reading User')
    }

    return user
  },
  getByEmail: async (email: string) => {
    const user = prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('Error while Reading User')
    }

    return user
  },
}

export default UsersService
