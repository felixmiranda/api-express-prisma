import prismaService from '../common/services/prisma.service'
import { ICreateUserDto } from './interfaces/createUser.dto'

const create = async (userData: ICreateUserDto) => {
  return prismaService.user.create({
    data: {
      ...userData
    }
  })
}

const getById = async (id: number) => {
  const user = await prismaService.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error('Error while reading user by id')
  }

  return user
}

const getByDni = async (dni: string) => {
  const user = await prismaService.user.findUnique({
    where: {
      dni,
    },
  })

  if (!user) {
    throw new Error('Error while reading user by dni')
  }

  return user
}

const getByEmail = async (email: string) => {
  const user = await prismaService.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('Error while reading user by email')
  }

  return user
}

const getCredentialsByEmail = async (email: string) => {
  const user = await prismaService.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      roleId: true,
    },
  })

  if (!user) {
    throw new Error('Error while Reading User')
  }

  return user
}

const deleteById = async (id: number) => {
  const deletedUser = await prismaService.user.delete({
    where: {
      id,
    }
  })
  return deletedUser
}

export default {
  create,
  getById,
  getByDni,
  getByEmail,
  getCredentialsByEmail,
  deleteById
}