import usersService from '../users/users.service'
import bcrypt from 'bcrypt'
import { IRegisterDto } from './interfaces/register.dto'
import jwt from 'jsonwebtoken'
import { IPayloadJWT } from './interfaces/jwt.interface'
import env from '../common/config/env.config'

const jwtAccessSecret = env.JWT.ACCESS_SECRET_KEY || ''
const accessTokenDuration = env.JWT.ACCESS_EXPIRATION_TIME || '0'
const jwtRefreshSecret = env.JWT.REFRESH_SECRET_KEY || ''
const refreshTokenDuration = env.JWT.REFRESH_EXPIRATION_TIME || '0'

const generateJwtKeys = (
  payload: IPayloadJWT
): { accessToken: string; expiresIn: string; cookieRefreshToken: string } => {
  const accessToken = jwt.sign(payload, jwtAccessSecret, {
    expiresIn: `${accessTokenDuration}s`,
  })

  const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: `${refreshTokenDuration}s`,
  })

  const cookieRefreshToken = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshTokenDuration}; SameSite=SameSite`

  return {
    accessToken,
    expiresIn: accessTokenDuration,
    cookieRefreshToken,
  }
}

const getCookiesForLogOut = () => {
  return 'Authentication=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
}

const register = async (registrationData: IRegisterDto) => {
  const hashedPassword = await bcrypt.hash(registrationData.password, 10)
  try {
    const createdUser = await usersService.create({
      ...registrationData,
      password: hashedPassword,
    })
    createdUser.password = ''
    return createdUser
  } catch(e){
    console.log(e)
    throw new Error('Error while register user')
  }
}

const verifyPassword = async (plainTextPassword: string, hashedPassword: string) => {
  const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword)
  if (!isPasswordMatching) {
    throw new Error('Invalid email and/or password')
  }
}

const getAuthenticatedUser = async (email: string, plainTextPassword: string) => {
  try {
    const user = await usersService.getCredentialsByEmail(email)
    if (!user) {
      throw new Error('Invalid email and/or password')
    }
    await verifyPassword(plainTextPassword, user.password)
    return user
  } catch {
    throw new Error('Invalid email and/or password')
  }
}

const verifyToken = async(token: string, type: 'access' | 'refresh') => {
  const secretToken = type === 'access' ? jwtAccessSecret : jwtRefreshSecret
  // return jwt.verify( token, secretToken ) as IJwt
  return jwt.verify( token, secretToken )
}

export default {
  register,
  generateJwtKeys,
  getCookiesForLogOut,
  verifyPassword,
  getAuthenticatedUser,
  verifyToken
}
