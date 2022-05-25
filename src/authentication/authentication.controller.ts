import { Request, Response } from 'express'
import authenticationService from './authentication.service'

const register = (req: Request, res: Response) => {
  return authenticationService.register(req.body)
}

const logIn = (req: Request, res: Response) => {
  const { accessToken, cookieRefreshToken } = authenticationService.generateJwtKeys({
    dni: req.body.dni,
    email: req.body.email,
    role: req.body.role,
  })

  res.setHeader('Set-Cookie', cookieRefreshToken)
  return res.status(201).json({ dni: req.body.dni, accessToken })
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
