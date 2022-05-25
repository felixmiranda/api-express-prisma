import prismaService from '../common/services/prisma.service'

const getById = async (id: number) => {
  const user = prismaService.user.findUnique({
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
  const user = prismaService.user.findUnique({
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
  const user = prismaService.user.findUnique({
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
  const user = prismaService.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
      roleid: true,
      name: true,
    },
  })

  if (!user) {
    throw new Error('Error while Reading User')
  }

  return user
}

export default {
  getById,
  getByDni,
  getByEmail,
  getCredentialsByEmail
}