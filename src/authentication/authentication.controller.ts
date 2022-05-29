import { Request, Response } from 'express'
import authenticationService from './authentication.service'

const register = async(req: Request, res: Response) => {
  const user = await authenticationService.register(req.body)
  return res.status(201).json(user)
}

const logIn = (req: Request, res: Response) => {
  const { accessToken, cookieRefreshToken } = authenticationService.generateJwtKeys({
    userId: req.body.userId,
    email: req.body.email,
    roleId: req.body.roleId,
  })

  res.setHeader('Set-Cookie', cookieRefreshToken)
  return res.status(201).json({ email: req.body.email, accessToken })
}

const logOut = (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', authenticationService.getCookiesForLogOut())
  res.sendStatus(200)
}

export default {
  register,
  logIn,
  logOut
}
